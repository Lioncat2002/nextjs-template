import { type TxClient, db } from "@/src/shared/db";
import type { CreateCompany } from "../schema";

export const createCompany = (data: CreateCompany, tx: TxClient = db) => {
	return tx.company.create({ data });
};
