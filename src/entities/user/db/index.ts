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

export const getUserByFirebaseUIDWithMemberships = async (
	firebaseUID: string,
) => {
	const user = await db.user.findUnique({
		where: {
			firebaseUID: firebaseUID,
		},
		include: {
			companies: {
				include: {
					company: true,
				},
			},
		},
	});
	return user;
};

export const getUserById = async (id: string) => {
	const user = await db.user.findUnique({
		where: {
			id: id,
		},
	});
	return user;
};

export const getUserByEmailWithMemberships = async (email: string) => {
	const user = await db.user.findUnique({
		where: {
			email: email,
		},
		include: {
			companies: {
				include: {
					company: true,
				},
			},
		},
	});
	return user;
};
