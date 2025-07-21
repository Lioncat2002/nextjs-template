import { Role as PrismaRole } from "@/generated/prisma";

export type RoleName = keyof typeof PrismaRole;
export const ROLE_NAMES: readonly RoleName[] = Object.values(PrismaRole);

export type Permission =
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
