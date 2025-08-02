import { type TxClient, db } from "@/src/shared/db";
import type { CreateUser } from "../schema";

export const createUser = (data: CreateUser, tx: TxClient = db) => {
	return tx.user.create({
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

export const getUserByFirebaseUIDWithMemberships = (
	firebaseUID: string,
	tx: TxClient = db,
) => {
	return tx.user.findUnique({
		where: { firebaseUID },
		include: {
			companies: {
				include: {
					company: true,
				},
			},
		},
	});
};

export const getUserById = (id: string, tx: TxClient = db) => {
	return tx.user.findUnique({
		where: { id },
	});
};

export const getUserByEmailWithMemberships = (
	email: string,
	tx: TxClient = db,
) => {
	return tx.user.findUnique({
		where: { email },
		include: {
			companies: {
				include: {
					company: true,
				},
			},
		},
	});
};
