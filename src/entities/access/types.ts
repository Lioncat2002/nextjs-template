type RoleName = "ADMIN" | "MANAGER" | "EMPLOYEE";

type Permission =
	| "user:read"
	| "user:write"
	| "user:delete"
	| "user:invite"
	| "org:read"
	| "org:write"
	| "org:delete"
	| "billing:read"
	| "billing:write"
	| (string & {});
