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
		SECRET_COOKIE_PASSWORD: z.string(),
	},
	/*
	 * Environment variables available on the client (and server).
	 *
	 * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
	 */
	client: {
		/* CLIENT SIDE ENVIRONMENT VARIABLES */
		NEXT_PUBLIC_API_URL: z.string().url(),
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
	},
	// experimental__runtimeEnv: {
	//   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	// }
});
