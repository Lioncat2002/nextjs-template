import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";

import { auth } from "@/src/shared/lib/firebase/firebase.client";
import { loginUserAction } from "./action";
import type { RegisterFormValues } from "./schema";

export const useCreateAccount = (redirect?: string) => {
	const router = useRouter();

	const { execute, isExecuting } = useAction(loginUserAction, {
		onSuccess: () => {
			if (redirect) router.push(redirect);
		},
		onError: (err) => {
			console.error("Action failed:", err);
		},
	});

	const handleSubmit = async (data: RegisterFormValues) => {
		try {
			const userCredentials = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password,
			);

			const idToken = await userCredentials.user.getIdToken();

			execute({
				idToken,
				meta: {
					uid: userCredentials.user.uid,
					email: data.email,
					displayName: data.displayName,
					phoneNumber: userCredentials.user.phoneNumber,
					photoURL: userCredentials.user.photoURL,
					emailVerified: userCredentials.user.emailVerified,
				},
			});
		} catch (err) {
			console.error("Firebase registration error:", err);
		}
	};

	return {
		handleSubmit,
		isExecuting,
	};
};
