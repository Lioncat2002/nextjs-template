"use client";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { createCompanyAction } from "./action";

export const useCreateCompany = () => {
	return useAction(createCompanyAction, {
		onSuccess: () => {
			toast("Company created");
		},
		onError: (err) => {
			console.error("Create company action failed:", err);
			toast("Error creating company");
		},
	});
};
