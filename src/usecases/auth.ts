import {
	createUser,
	getUserByFirebaseUIDWithMemberships,
} from "@/src/entities/user/db";
import { verifyFirebaseIdToken } from "@/src/shared/lib/firebase/firebase.server";
import type { LoginData } from "../entities/user/schema";
import { destroySession, setSession } from "../shared/auth/session";
import {
	renderLoginNotificationEmail,
	renderWelcomeEmail,
} from "../shared/emails/email-template";
import { sendEmail } from "../shared/emails/resend";

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
		const html = await renderWelcomeEmail({
			userName: meta.displayName ?? "User",
			companyName: "YourApp",
			dashboardUrl: "https://yourapp.com/dashboard",
			supportEmail: "support@yourapp.com",
		});
		await sendEmail({
			to: meta.email ?? "",
			html: html,
			subject: "Welcome to your app",
		});
	} else {
		userId = userWithMemberships.id;
		const html = await renderLoginNotificationEmail({
			userName: meta.displayName ?? "User",
			loginTime: new Date().toLocaleString(),
			location: "an unknown location",
			device: "a new device",
			supportEmail: "support@yourapp.com",
		});
		await sendEmail({
			to: meta.email ?? "",
			html: html,
			subject: "New Login Detected",
		});
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
