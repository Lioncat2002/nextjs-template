import type { Company } from "@/generated/prisma";

export type Organization = Company;

export type CreateOrganization = Pick<
	Organization,
	| "name"
	| "description"
	| "logo"
	| "website"
	| "location"
	| "phoneNumber"
	| "email"
>;
