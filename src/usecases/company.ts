import { addUserMembership } from "../entities/membership/db";
import { createCompany } from "../entities/organization/db";
import type { CreateCompany } from "../entities/organization/schema";
import { type TxClient, db } from "../shared/db";

export const createCompanyUsecase = async (
	data: CreateCompany,
	userId: string,
) => {
	return db.$transaction(async (tx: TxClient) => {
		const company = await createCompany(data, tx);
		console.log("THIS IS THE USER ID ", userId, company.id);
		await addUserMembership(
			{
				companyId: company.id,
				userId: userId,
				role: "ADMIN",
			},
			tx,
		);

		return company;
	});
};
