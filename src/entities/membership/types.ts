import type { Permission, RoleName } from "../access/types";

export type OrgMembership = {
	userId: string;
	orgId: string;
	role: RoleName;
	permissions: Permission[];
	joinedAt: Date;
};
