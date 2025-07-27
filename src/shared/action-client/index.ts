import { Prisma } from "@/generated/prisma/client";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { authMiddleware } from "./middlewares";

const actionClient = createSafeActionClient({
	defineMetadataSchema() {
		return z.object({
			actionName: z.string(),
		});
	},
	handleServerError(e, utils) {
		const { clientInput, metadata } = utils;
		console.error(
			`Error executing action:\n  Input: ${clientInput} \n ActionName: ${metadata.actionName} \n Error: ${e}`,
		);
		if (e instanceof Prisma.PrismaClientKnownRequestError) {
			switch (e.code) {
				case "P2002":
					return "A record with this value already exists.";
				case "P2025":
					return "Record not found.";
				default:
					return "Database request failed.";
			}
		}

		if (
			e instanceof Prisma.PrismaClientValidationError ||
			e instanceof Prisma.PrismaClientUnknownRequestError ||
			e instanceof Prisma.PrismaClientRustPanicError ||
			e instanceof Prisma.PrismaClientInitializationError
		) {
			return "Unexpected database error. Please try again.";
		}

		return e.message;
	},
});

export const authenticatedAction = actionClient.use(authMiddleware);
export const unAuthenticatedAction = actionClient;
