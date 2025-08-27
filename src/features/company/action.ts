"use server";

import {
	type CreateCompany,
	CreateCompanySchema,
} from "@/src/entities/organization/schema";
import { authenticatedAction } from "@/src/shared/action-client";
import type { SessionModel } from "@/src/shared/auth/session-option";
import { createCompanyUsecase } from "@/src/usecases/company/company";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createCompanyAction = authenticatedAction
	.metadata({
		actionName: "createCompanyAction",
	})
	.inputSchema(CreateCompanySchema)
	.action(
		async ({
			parsedInput,
			ctx,
		}: { parsedInput: CreateCompany; ctx: { session: SessionModel } }) => {
			const company = await createCompanyUsecase(
				parsedInput,
				ctx.session.meta.id,
			);
			revalidatePath("/c");
			redirect(`/${company.id}/home`);
		},
	);
