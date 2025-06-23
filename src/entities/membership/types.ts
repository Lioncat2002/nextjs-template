type OrgMembership = {
	userId: string;
	orgId: string;
	role: RoleName;
	permissions: Permission[];
	joinedAt: Date;
};
