"use server";

import type { RoleName } from "@/src/entities/access/types";
import { authenticatedAction } from "@/src/shared/action-client";
import type { SessionModel } from "@/src/shared/auth/session-option";
import { sendInviteUsecase } from "@/src/usecases/membership/membership";
import {
	acceptInvitationUsecase,
	rejectInvitationUsecase,
} from "@/src/usecases/membership/membership";
import {
	type AddMembershipInput,
	AddMembershipSchema,
	type UpdateInvitationStatusInput,
	UpdateInvitationStatusSchema,
} from "./validator";

export const inviteMemberAction = authenticatedAction
	.metadata({
		actionName: "inviteMemberAction",
	})
	.inputSchema(AddMembershipSchema)
	.action(
		async ({
			parsedInput,
			ctx,
		}: {
			parsedInput: AddMembershipInput;
			ctx: { session: SessionModel };
		}) => {
			await sendInviteUsecase({
				email: parsedInput.email,
				name: parsedInput.name,
				role: parsedInput.role as RoleName,
				companyId: parsedInput.companyId,
				inviterId: ctx.session.meta.id,
			});
		},
	);

export const updateInvitationStatusAction = authenticatedAction
	.metadata({
		actionName: "updateInvitationStatusAction",
	})
	.inputSchema(UpdateInvitationStatusSchema)
	.action(
		async ({
			parsedInput,
			ctx,
		}: {
			parsedInput: UpdateInvitationStatusInput;
			ctx: { session: SessionModel };
		}) => {
			switch (parsedInput.status) {
				case "ACCEPTED":
					return await acceptInvitationUsecase(
						parsedInput.token,
						ctx.session.meta.id,
					);
				case "REVOKED":
					return await rejectInvitationUsecase(
						parsedInput.token,
						ctx.session.meta.id,
					);
				default:
					throw new Error("Invalid status");
			}
		},
	);
