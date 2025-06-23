type RoleName = "admin" | "manager" | "employee";

type Permission =
	| "user:read"
	| "user:write"
	| "user:delete"
	| "user:invite"
	| "org:read"
	| "org:write"
	| "org:delete"
	| "billing:read"
	| "billing:edit";

type Role = {
	id: string;
	name: RoleName;
	description?: string;
	permissions: Permission[];
};
