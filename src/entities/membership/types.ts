import type { CompanyMembership } from "@/generated/prisma";
import type { User } from "@/src/entities/user/types";

export type OrgMembership = CompanyMembership;

export type OrgMembershipWithUser = OrgMembership & {
	user: User;
};
