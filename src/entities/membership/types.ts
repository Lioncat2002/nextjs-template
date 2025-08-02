import type { CompanyMembership } from "@/generated/prisma";

export type OrgMembership = CompanyMembership;

export type AddUserMembership = Omit<
	Pick<OrgMembership, "companyId" | "userId" | "role">,
	"role"
> & {
	role?: OrgMembership["role"];
};
