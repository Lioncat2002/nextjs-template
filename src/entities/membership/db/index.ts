import { type TxClient, db } from "@/src/shared/db";
import type { RoleName } from "../../access/types";

export const addUserMembership = (
	data: {
		companyId: string;
		userId: string;
		role: RoleName;
	},
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

export const getAllOrgMemberships = (orgId: string, tx: TxClient = db) => {
	return tx.companyMembership.findMany({
		where: {
			companyId: orgId,
		},
		include: {
			user: true,
		},
	});
};
