import { createMiddleware } from "next-safe-action";
import { createSessionManager } from "../auth/session";

export const authMiddleware = createMiddleware().define(async ({ next }) => {
	const { getSession } = createSessionManager();
	const session = await getSession();

	if (!session) throw new Error("Unauthorized");
	// pass in the decoded data from the session token - > TODO
	return next({ ctx: { session } });
});
