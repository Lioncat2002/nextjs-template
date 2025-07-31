import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { useAction } from "next-safe-action/hooks";

import { auth } from "@/src/shared/lib/firebase/firebase.client";
import { loginUserAction } from "./action";
import type { LoginFormValues } from "./schema";
import { toast } from "sonner";
import { getErrorMessage } from "@/src/shared/lib/utils";

export const useLogin = () => {
	const { execute, isExecuting } = useAction(loginUserAction, {
		onSuccess: () => {
			console.log("Login successful");
		},
		onError: (err) => {
			console.error("Login action failed:", err);
			toast(getErrorMessage(err))
		},
	});

	const handleCredentialLogin = async (data: LoginFormValues) => {
		try {
			const userCredentials = await signInWithEmailAndPassword(
				auth,
				data.email,
				data.password,
			);

			const idToken = await userCredentials.user.getIdToken();

			execute({
				idToken,
				meta: {
					uid: userCredentials.user.uid,
					email: userCredentials.user.email,
					displayName: userCredentials.user.displayName,
					phoneNumber: userCredentials.user.phoneNumber,
					photoURL: userCredentials.user.photoURL,
					emailVerified: userCredentials.user.emailVerified,
				},
			});
		} catch (err) {
			console.error("Firebase email/password login error:", err);
			toast(getErrorMessage(err))
		}
	};

	const handleGoogleLogin = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const userCredentials = await signInWithPopup(auth, provider);
			const idToken = await userCredentials.user.getIdToken();

			execute({
				idToken,
				meta: {
					uid: userCredentials.user.uid,
					email: userCredentials.user.email,
					displayName: userCredentials.user.displayName,
					phoneNumber: userCredentials.user.phoneNumber,
					photoURL: userCredentials.user.photoURL,
					emailVerified: userCredentials.user.emailVerified,
				},
			});
		} catch (err) {
			console.error("Firebase Google login error:", err);
			toast(getErrorMessage(err))
		}
	};

	return {
		handleCredentialLogin,
		handleGoogleLogin,
		isSubmitting: isExecuting,
	};
};
