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
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { type LoginFormValues, LoginSchema } from "./schema";
import { useLogin } from "./use-login";

interface LoginFormProps
	extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {}

export const LoginForm = ({ className }: LoginFormProps) => {
	const searchParams = useSearchParams();
	const isInvite = searchParams.get("invite");
	const redirectPath = isInvite ? `/invite?token=${isInvite}` : "/c";
	const { handleCredentialLogin, handleGoogleLogin, isSubmitting } =
		useLogin(redirectPath);
	const form = useForm<LoginFormValues>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(LoginSchema),
	});
	return (
		<Form {...form}>
			<form
				className="space-y-4"
				onSubmit={form.handleSubmit(handleCredentialLogin)}
			>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									id="email"
									type="email"
									placeholder="name@example.com"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center justify-between">
								<FormLabel>Password</FormLabel>
								<Link
									href="/forgot-password"
									className="text-xs text-primary hover:underline"
								>
									Forgot password?
								</Link>
							</div>
							<FormControl>
								<Input
									id="password"
									type="password"
									placeholder="••••••••"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={isSubmitting}>
					{isSubmitting && <LoaderCircle />}Sign in
				</Button>
				<Button type="button" className="w-full" onClick={handleGoogleLogin}>
					<FaGoogle /> Sign in with Google
				</Button>
			</form>
		</Form>
	);
};
