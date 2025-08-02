import { Prisma } from "@/generated/prisma/client";
import chalk from "chalk";
import { createSafeActionClient } from "next-safe-action";
import { redirect } from "next/navigation";
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
		if (e.message === "Unauthorized") throw redirect("/login");
		console.error(
			chalk.bgRed.white.bold("Error executing action"),
			`\nInput:\n${chalk.gray(safeStringify(clientInput))}`,
			`\nAction Name: ${chalk.yellow(metadata.actionName)}`,
			`\nMessage: ${chalk.red(e instanceof Error ? e.message : safeStringify(e))}`,
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

function safeStringify(value: unknown): string {
	if (typeof value === "string") return value;
	if (typeof value === "number" || typeof value === "boolean")
		return String(value);
	try {
		return JSON.stringify(value, null, 2);
	} catch {
		return "[Unserializable object]";
	}
}
