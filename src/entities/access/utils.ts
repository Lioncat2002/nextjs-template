import { PERMISSION_LISTS } from "./constants";

export function hasPermission(role: RoleName, permission: Permission): boolean {
	const permissions = PERMISSION_LISTS[role];
	return permissions.includes(permission);
}
