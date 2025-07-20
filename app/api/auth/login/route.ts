import { createSessionManager } from "@/src/shared/auth/session";
import {
	ERROR_MESSAGES,
	StatusCodes,
} from "@/src/shared/constants/status-code-messages";
import type { UserCredential } from "firebase/auth";
import { type NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

type LoginResponse = {
	data: {
		access_token: string;
		refresh_token: string | null;
		meta: UserCredential;
	};
};

type LoginRequest = {
	idToken: string;
	meta: UserCredential;
};

export async function POST(req: NextRequest) {
	console.info("Login request received");
	try {
		const { idToken, meta } = (await req.json()) as LoginRequest;
		if (!idToken) {
			console.error("Missing idToken");
			return NextResponse.json(
				{ ok: false, message: "Missing idToken" },
				{ status: 400 },
			);
		}
		console.info("idToken received");
		const { setSession } = createSessionManager();
		console.info("Session manager created");

		/* TODO: Implement login logic -> ID TOKEN, IF USER EXISTS IN DB LOGIN, ELSE CREATE NEW */

		const {
			user: {
				phoneNumber,
				photoURL,
				displayName,
				email,
				emailVerified,
				uid: firebaseUID,
			},
		} = meta;

		console.info("Login response received");
		await setSession({
			accessToken: "",
			refreshToken: "",
		});
		console.info("Session set");

		return NextResponse.json({
			ok: true,
			message: "Login successful",
			data: null,
		});
	} catch (err) {
		console.error("Login error:", err);
		return NextResponse.json(
			{ ok: false, message: ERROR_MESSAGES[500], data: null },
			{ status: StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR },
		);
	}
}
