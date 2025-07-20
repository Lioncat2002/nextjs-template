"use client";

import { Button } from "@/src/shared/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/src/shared/ui/form";
import { Input } from "@/src/shared/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ResetPasswordFormValues, ResetPasswordSchema } from "./schema";

export const ResetForm = () => {
	const form = useForm<ResetPasswordFormValues>({
		defaultValues: {
			email: "",
		},
		resolver: zodResolver(ResetPasswordSchema),
	});

	const handleSubmit = form.handleSubmit((data) => {
		console.log("Reset password for:", data.email);
		// Add API call logic here
	});

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									type="email"
									placeholder="you@example.com"
									className="clay-input"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full">
					Send Password Reset Link
				</Button>
			</form>
		</Form>
	);
};
