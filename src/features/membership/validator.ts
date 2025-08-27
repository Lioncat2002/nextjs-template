import { ROLE_NAMES } from "@/src/entities/access/types";
import { z } from "zod";

export const AddMembershipSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	role: z.enum([...Object.values(ROLE_NAMES)] as [string, ...string[]]),
	companyId: z.string(),
	inviterId: z.string(),
});

export type AddMembershipInput = z.infer<typeof AddMembershipSchema>;

export const UpdateInvitationStatusSchema = z.object({
	token: z.string(),
	status: z.enum(["ACCEPTED", "REVOKED"]),
});

export type UpdateInvitationStatusInput = z.infer<
	typeof UpdateInvitationStatusSchema
>;
