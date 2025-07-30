import { db } from "@/src/shared/db";

export const getAllUserMemberships = async (userId: string) => {
	return db.companyMembership.findMany({
		where: {
			userId: userId,
		},
	});
};
