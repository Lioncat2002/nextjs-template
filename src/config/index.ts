import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	/*
	 * Serverside Environment variables, not available on the client.
	 * Will throw if you access these variables on the client.
	 */
	server: {
		/* SERVER SIDE ENVIRONMENT VARIABLES */
		DATABASE_URL: z.string().url(),
		NODE_ENV: z.enum(["development", "production", "test"]),
		SECRET_COOKIE_PASSWORD: z.string().min(32),
		RESEND_API_KEY: z.string(),
	},
	/*
	 * Environment variables available on the client (and server).
	 *
	 * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
	 */
	client: {
		/* CLIENT SIDE ENVIRONMENT VARIABLES */
		NEXT_PUBLIC_API_URL: z.string().url(),
		NEXT_PUBLIC_FIREBASE_API_KEY: z.string(),
		NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string(),
		NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string(),
		NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string(),
		NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string(),
		NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string(),
		NEXT_PUBLIC_FIREBASE_APP_ID: z.string(),
		NEXT_PUBLIC_DEPLOYMENT_URL: z.string(),
	},
	/*
	 * Specify what values should be validated by your schemas above.
	 *
	 * If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
	 * For Next.js >= 13.4.4, you can use the experimental__runtimeEnv option and
	 * only specify client-side variables.
	 */
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		NODE_ENV: process.env.NODE_ENV,
		SECRET_COOKIE_PASSWORD: process.env.SECRET_COOKIE_PASSWORD,
		NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
			process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		NEXT_PUBLIC_FIREBASE_PROJECT_ID:
			process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
			process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
			process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
		NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
			process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
		NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
		NEXT_PUBLIC_DEPLOYMENT_URL: process.env.NEXT_PUBLIC_DEPLOYMENT_URL,
		RESEND_API_KEY: process.env.RESEND_API_KEY,
	},
	// experimental__runtimeEnv: {
	//   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	// }
});
