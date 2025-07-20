import { env } from "@/src/config";
import type { SessionOptions } from "iron-session";
import { sealData, unsealData } from "iron-session";
import { z } from "zod";

export const SessionSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string().nullable(),
});

export type SessionModel = z.infer<typeof SessionSchema>;

// Default session configuration
export const defaultSessionOptions: SessionOptions = {
	cookieName: "app-session",
	password: env.SECRET_COOKIE_PASSWORD,
	cookieOptions: {
		secure: env.NODE_ENV === "production",
		httpOnly: true,
		sameSite: "strict",
		maxAge: 60 * 60 * 24,
		path: "/",
	},
	ttl: 0,
};

const getSessionOptions = (
	customOptions?: Partial<SessionOptions>,
): SessionOptions => ({
	...defaultSessionOptions,
	...customOptions,
	cookieOptions: {
		...defaultSessionOptions.cookieOptions,
		...customOptions?.cookieOptions,
	},
});

const getSession = async (
	options?: Partial<SessionOptions>,
): Promise<SessionModel | null> => {
	try {
		const sessionOptions = getSessionOptions(options);
		const { cookies } = await import("next/headers");
		const cookieStore = await cookies();
		const sessionCookie = cookieStore.get(sessionOptions.cookieName);

		if (!sessionCookie) {
			return null;
		}

		if (env.NODE_ENV === "development") {
			// In dev mode, parse directly without encryption
			return SessionSchema.parse(JSON.parse(sessionCookie.value));
		}

		// In production, unseal encrypted session
		const unsealedData = await unsealData(sessionCookie.value, {
			password: sessionOptions.password,
		});
		return SessionSchema.parse(unsealedData);
	} catch (error) {
		console.error("Failed to parse or unseal session:", error);
		return null;
	}
};

const setSession = async (
	value: SessionModel,
	options?: Partial<SessionOptions>,
): Promise<void> => {
	try {
		const sessionOptions = getSessionOptions(options);
		const { cookies } = await import("next/headers");
		const cookieStore = await cookies();
		let sessionValue: string;

		if (env.NODE_ENV === "development") {
			// In dev mode, store as plain JSON
			sessionValue = JSON.stringify(value);
		} else {
			// In production, encrypt session
			sessionValue = await sealData(value, {
				password: sessionOptions.password,
				ttl: sessionOptions.ttl,
			});
		}

		cookieStore.set(
			sessionOptions.cookieName,
			sessionValue,
			sessionOptions.cookieOptions,
		);
	} catch (error) {
		console.error("Failed to set session:", error);
		throw new Error("Unable to set session cookie");
	}
};

const destroySession = async (
	options?: Partial<SessionOptions>,
): Promise<void> => {
	const sessionOptions = getSessionOptions(options);
	const { cookies } = await import("next/headers");
	const cookieStore = await cookies();
	cookieStore.delete(sessionOptions.cookieName);
};

export const createSessionManager = (
	customOptions?: Partial<SessionOptions>,
) => {
	const sessionOptions = getSessionOptions(customOptions);
	return {
		getSession: () => getSession(sessionOptions),
		setSession: (value: SessionModel) => setSession(value, sessionOptions),
		destroySession: () => destroySession(sessionOptions),
	};
};
