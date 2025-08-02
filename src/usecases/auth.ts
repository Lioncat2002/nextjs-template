import {
	createUser,
	getUserByFirebaseUIDWithMemberships,
} from "@/src/entities/user/db";
import { verifyFirebaseIdToken } from "@/src/shared/lib/firebase/firebase.server";
import type { LoginData } from "../entities/user/schema";
import { destroySession, setSession } from "../shared/auth/session";

export const loginUseCase = async (input: LoginData) => {
	const { idToken, meta } = input;

	const isValid = await verifyFirebaseIdToken(idToken);
	if (!isValid) throw new Error("Invalid Firebase ID token");

	const userWithMemberships = await getUserByFirebaseUIDWithMemberships(
		meta.uid,
	);
	let userId: string;
	if (!userWithMemberships) {
		const createdUser = await createUser({
			firebaseUID: meta.uid,
			displayName: meta.displayName ?? "",
			email: meta.email ?? "",
			phoneNumber: meta.phoneNumber ?? "",
			photoURL: meta.photoURL ?? "",
			emailVerified: meta.emailVerified,
		});
		userId = createdUser.id;
	} else {
		userId = userWithMemberships.id;
	}

	await setSession({
		accessToken: idToken,
		refreshToken: null,
		meta: {
			...meta,
			id: userId,
		},
	});
};

export const logoutUseCase = async () => {
	await destroySession();
};
