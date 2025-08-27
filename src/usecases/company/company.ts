import { addUserMembership } from "@/src/entities/membership/db";
import { createCompany } from "@/src/entities/organization/db";
import type { CreateCompany } from "@/src/entities/organization/schema";
import { type TxClient, db } from "@/src/shared/db";

export const createCompanyUsecase = async (
	data: CreateCompany,
	userId: string,
) => {
	return db.$transaction(async (tx: TxClient) => {
		const company = await createCompany(data, tx);
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
