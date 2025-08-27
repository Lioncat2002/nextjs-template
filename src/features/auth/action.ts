"use server";

import { type LoginData, LoginDataSchema } from "@/src/entities/user/schema";
import {
	authenticatedAction,
	unAuthenticatedAction,
} from "@/src/shared/action-client";
import { loginUseCase, logoutUseCase } from "@/src/usecases/auth/auth";
import { redirect } from "next/navigation";

export const loginUserAction = unAuthenticatedAction
	.metadata({
		actionName: "loginUserAction",
	})
	.inputSchema(LoginDataSchema)
	.action(async ({ parsedInput }: { parsedInput: LoginData }) => {
		await loginUseCase(parsedInput);
	});

export const logoutUserAction = authenticatedAction
	.metadata({
		actionName: "logoutUserAction",
	})
	.action(async () => {
		await logoutUseCase();
		redirect("/login");
	});
