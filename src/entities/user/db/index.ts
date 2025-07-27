import { db } from "@/src/shared/db";
import type { CreateUser } from "../schema";

export const createUser = async (data: CreateUser) => {
	return await db.user.create({
		data: {
			displayName: data.displayName,
			phoneNumber: data.phoneNumber,
			photoURL: data.photoURL,
			email: data.email,
			firebaseUID: data.firebaseUID,
			emailVerified: data.emailVerified,
		},
	});
};

export const getUserByFirebaseUID = async (firebaseUID: string) => {
	const user = await db.user.findUnique({
		where: {
			firebaseUID: firebaseUID,
		},
	});
	return user;
};
