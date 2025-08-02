import { type Prisma, PrismaClient } from "@/generated/prisma";

let _db: PrismaClient;

const dbClient = () => {
	if (!_db && typeof window === "undefined") {
		_db = new PrismaClient();
	}
	return _db;
};

export const db = dbClient();
export type TxClient = Prisma.TransactionClient | PrismaClient;
