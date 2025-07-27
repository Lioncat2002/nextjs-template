import "server-only";

import { env } from "@/src/config";
import type { SessionOptions } from "iron-session";
import { z } from "zod";

export const SessionSchema = z.object({
	accessToken: z.string(),
	refreshToken: z.string().nullable(),
	meta: z.any().optional(),
});

export type SessionModel = z.infer<typeof SessionSchema>;

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

export const getSessionOptions = (
	customOptions?: Partial<SessionOptions>,
): SessionOptions => ({
	...defaultSessionOptions,
	...customOptions,
	cookieOptions: {
		...defaultSessionOptions.cookieOptions,
		...customOptions?.cookieOptions,
	},
});
