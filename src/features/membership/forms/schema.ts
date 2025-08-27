import { ROLE_NAMES } from "@/src/entities/access/types";
import { z } from "zod";

export const AddMembershipFormSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	role: z.enum([...Object.values(ROLE_NAMES)] as [string, ...string[]]),
});

export type AddMembershipFormValues = z.infer<typeof AddMembershipFormSchema>;
