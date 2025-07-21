import { getRolePermissions, hasPermission } from "./constants";
import type { Permission, RoleName } from "./types";

export const addPermissionMetadata = <T extends Record<string, unknown>>(
	object: T,
	role: RoleName,
): T & { permissions: readonly Permission[] } => {
	return {
		...object,
		permissions: getRolePermissions(role),
	};
};

export const checkPermission = (
	role: RoleName,
	permission: Permission,
): boolean => {
	return hasPermission(role, permission);
};

export const userCan = (
	userWithRole: RoleName,
	permission: Permission,
): boolean => {
	return hasPermission(userWithRole, permission);
};
