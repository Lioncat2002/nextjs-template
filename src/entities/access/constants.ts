import type { Permission, RoleName } from "./types";

const BASE_PERMISSIONS = {
	READ: ["user:read", "org:read", "billing:read"] as const,

	MANAGE: ["user:read", "user:invite", "org:read", "billing:read"] as const,

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
	] as const,
} as const;

export const PERMISSION_LISTS = {
	ADMIN: BASE_PERMISSIONS.ADMIN,
	MANAGER: BASE_PERMISSIONS.MANAGE,
	EMPLOYEE: BASE_PERMISSIONS.READ,
} as const satisfies Record<RoleName, readonly Permission[]>;

export const hasPermission = (
	role: RoleName,
	permission: Permission,
): boolean => {
	return (PERMISSION_LISTS[role] as readonly Permission[]).includes(permission);
};

export const getRolePermissions = (role: RoleName): readonly Permission[] => {
	return PERMISSION_LISTS[role];
};

export const ALL_PERMISSIONS = [
	...new Set(Object.values(PERMISSION_LISTS).flat()),
] as Permission[];

export const ROLE_HIERARCHY: Record<RoleName, number> = {
	EMPLOYEE: 1,
	MANAGER: 2,
	ADMIN: 3,
} as const;

export const hasHigherOrEqualRole = (
	userRole: RoleName,
	requiredRole: RoleName,
): boolean => {
	return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};
