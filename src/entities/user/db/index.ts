import { type TxClient, db } from "@/src/shared/db";

export const createUser = (
	data: {
		displayName: string;
		phoneNumber?: string;
		photoURL?: string;
		email: string;
		firebaseUID?: string;
		emailVerified: boolean;
	},
	tx: TxClient = db,
) => {
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

export const getUserByEmail = (email: string, tx: TxClient = db) => {
	return tx.user.findUnique({
		where: { email },
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
