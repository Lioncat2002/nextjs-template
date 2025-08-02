import { type TxClient, db } from "@/src/shared/db";
import type { AddUserMembership } from "../types";

export const addUserMembership = (
	data: AddUserMembership,
	tx: TxClient = db,
) => {
	return tx.companyMembership.create({ data });
};

export const getAllUserMemberships = (userId: string, tx: TxClient = db) => {
	return tx.companyMembership.findMany({
		where: {
			userId,
		},
	});
};
