import { type ClassValue, clsx } from "clsx";
import { FirebaseError } from "firebase/app";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const DEFAULT_ERROR_MESSAGE = "An unknown error occurred.";
export function mapAuthCodeToMessage(error: FirebaseError) {
	switch (error.code) {
		case "auth/wrong-password":
			return "Invalid Credentials";
		case "auth/invalid-email":
			return "Invalid Credentials";
		case "auth/email-already-exists":
			return "Email is already taken";
		case "auth/internal-error":
			return "Some internal error occured";
		case "auth/email-already-in-use":
			return "Email already exists";
		case "auth/invalid-credential":
			return "Invalid Credentials";
		case "auth/popup-closed-by-user":
			return "Sign-in popup was closed before completing authentication";
	}
	console.warn("Undocumented firebase error", error);
	return DEFAULT_ERROR_MESSAGE;
}

export function getErrorMessage(error: unknown): string {
	if (error instanceof FirebaseError) {
		return mapAuthCodeToMessage(error);
	}
	if (error instanceof Error) {
		return error.message;
	}
	// Default error message
	return DEFAULT_ERROR_MESSAGE;
}
