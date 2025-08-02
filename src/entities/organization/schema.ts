import { z } from "zod";

export const CreateCompanySchema = z.object({
	name: z
		.string()
		.min(2, "Company name must be at least 2 characters")
		.max(100, "Company name must be at most 100 characters")
		.regex(
			/^[A-Za-z0-9&()\-.'",\s]+$/,
			"Company name contains invalid characters",
		),

	description: z
		.string()
		.min(50, "Company description must be at least 50 characters")
		.optional()
		.nullable(),

	email: z
		.string()
		.email("Valid email required")
		.optional()
		.nullable()
		.or(z.literal(""))
		.or(z.literal(null)),

	phoneNumber: z.string().optional().nullable(),

	website: z
		.string()
		.url("Valid URL required")
		.optional()
		.nullable()
		.or(z.literal(""))
		.or(z.literal(null)),

	location: z.string().optional().nullable(),

	logo: z.string().optional().nullable(),
});

export type CreateCompany = z.infer<typeof CreateCompanySchema>;
