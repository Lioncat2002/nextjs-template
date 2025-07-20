export const PERMISSION_LISTS: Record<RoleName, Permission[]> = {
	ADMIN: [
		"user:read",
		"user:write",
		"user:delete",
		"user:invite",
		"org:read",
		"org:write",
		"org:delete",
		"billing:read",
		"billing:write",
	],
	MANAGER: ["user:read", "user:invite", "org:read", "billing:read"],
	EMPLOYEE: ["user:read", "org:read", "billing:read"],
} as const;
