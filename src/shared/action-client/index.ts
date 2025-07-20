import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { authMiddleware } from "./middlewares";

const actionClient = createSafeActionClient({
	defineMetadataSchema() {
		return z.object({
			actionName: z.string(),
		});
	},
});

export const authClient = actionClient.use(authMiddleware);
export const publicClient = actionClient;
