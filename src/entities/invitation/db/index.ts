import { type TxClient, db } from "@/src/shared/db";
import type { RoleName } from "../../access/types";
import type { InvitationStatus } from "../types";

export const createInvitation = (
	data: {
		email: string;
		companyId: string;
		inviterId: string;
		token: string;
		expiresAt: Date;
		role: RoleName;
		status?: InvitationStatus;
	},
	tx: TxClient = db,
) => {
	return tx.invitation.create({ data });
};

export const getInvitationByToken = (token: string, tx: TxClient = db) => {
	return tx.invitation.findUnique({
		where: { token },
		include: {
			company: true,
			inviter: true,
		},
	});
};

export const updateInvitationStatus = (
	token: string,
	status: InvitationStatus,
	tx: TxClient = db,
) => {
	return tx.invitation.update({
		where: { token },
		data: { status },
	});
};

export const deleteInvitation = (token: string, tx: TxClient = db) => {
	return tx.invitation.delete({
		where: { token },
	});
};

export const listInvitationsForCompany = (
	companyId: string,
	tx: TxClient = db,
) => {
	return tx.invitation.findMany({
		where: { companyId },
		orderBy: { createdAt: "desc" },
	});
};

export const findPendingInvitation = (
	email: string,
	companyId: string,
	tx: TxClient = db,
) => {
	return tx.invitation.findFirst({
		where: {
			email,
			companyId,
			status: "PENDING",
			expiresAt: { gt: new Date() },
		},
	});
};
