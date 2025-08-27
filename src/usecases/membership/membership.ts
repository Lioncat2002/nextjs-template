import { env } from "@/src/config";
import type { RoleName } from "@/src/entities/access/types";
import {
	createInvitation,
	findPendingInvitation,
	getInvitationByToken,
	updateInvitationStatus,
} from "@/src/entities/invitation/db";
import {
	addUserMembership,
	getAllOrgMemberships,
} from "@/src/entities/membership/db";
import { getCompanyById } from "@/src/entities/organization/db";
import { getUserById } from "@/src/entities/user/db";
import { type TxClient, db } from "@/src/shared/db";
import { renderInviteEmail } from "@/src/shared/emails/email-template";
import { sendEmail } from "@/src/shared/emails/resend";

type AddMembershipParams = {
	name: string;
	email: string;
	role: RoleName;
	companyId: string;
	inviterId: string;
};

export const sendInviteUsecase = async (input: AddMembershipParams) => {
	const company = await getCompanyById(input.companyId);
	if (!company) throw new Error("Invited company not found");

	const inviter = await getUserById(input.inviterId);
	if (!inviter) throw new Error("Inviter not found");

	const invitation = await db.$transaction(async (tx: TxClient) => {
		// check if already pending invite
		const existingInvite = await findPendingInvitation(
			input.email,
			input.companyId,
			tx,
		);
		if (existingInvite) return existingInvite;

		// create new invitation with stored token
		return createInvitation(
			{
				email: input.email,
				companyId: input.companyId,
				inviterId: input.inviterId,
				role: input.role,
				token: crypto.randomUUID(),
				expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
			},
			tx,
		);
	});

	const inviteUrl = `${env.NEXT_PUBLIC_DEPLOYMENT_URL}/invite?token=${invitation.token}`;

	const html = await renderInviteEmail({
		inviteUrl,
		teamName: company.name,
		inviterName: inviter.displayName ?? "Unknown",
		inviterEmail: inviter.email,
	});

	await sendEmail({
		to: input.email,
		html,
		subject: "Invite to join a team",
	});

	return invitation;
};

export const getAllMembershipsUsecase = async (companyId: string) => {
	const memberships = await getAllOrgMemberships(companyId);
	return memberships;
};

export const getInviteByTokenUsecase = async (token: string) => {
	const invitation = await getInvitationByToken(token);
	if (!invitation) throw new Error("Invalid or expired invitation");

	// check expiry
	if (invitation.expiresAt && invitation.expiresAt < new Date()) {
		throw new Error("Invitation has expired");
	}

	return invitation;
};

export const acceptInvitationUsecase = async (
	token: string,
	userId: string,
) => {
	const invitation = await getInvitationByToken(token);
	if (!invitation) throw new Error("Invitation not found");
	if (invitation.expiresAt && invitation.expiresAt < new Date()) {
		throw new Error("Invitation has expired");
	}
	if (invitation.status !== "PENDING") {
		throw new Error("Invitation is not pending");
	}

	// Verify the authenticated user's email matches the invitation
	const user = await getUserById(userId);
	if (!user || user.email !== invitation.email) {
		throw new Error("This invitation is not for your account");
	}

	// Check if user is already a member
	const existingMembership = await db.companyMembership.findUnique({
		where: {
			userId_companyId: {
				userId: userId,
				companyId: invitation.companyId,
			},
		},
	});

	if (existingMembership) {
		throw new Error("You are already a member of this company");
	}

	return await db.$transaction(async (tx: TxClient) => {
		await addUserMembership(
			{
				companyId: invitation.companyId,
				userId: userId,
				role: invitation.role,
			},
			tx,
		);

		// Update invitation status
		return await updateInvitationStatus(token, "ACCEPTED", tx);
	});
};

export const rejectInvitationUsecase = async (
	token: string,
	userId: string,
) => {
	const invitation = await getInvitationByToken(token);
	if (!invitation) throw new Error("Invitation not found");
	if (invitation.status !== "PENDING") {
		throw new Error("Invitation is not pending");
	}

	// Verify the authenticated user's email matches the invitation
	const user = await getUserById(userId);
	if (!user || user.email !== invitation.email) {
		throw new Error("This invitation is not for your account");
	}

	return updateInvitationStatus(token, "REVOKED");
};
