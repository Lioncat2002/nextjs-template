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
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { FaGoogle } from "react-icons/fa";
import { type RegisterFormValues, RegisterSchema } from "./schema";
import { useLogin } from "./use-login";
import { useCreateAccount } from "./use-register-account";

interface RegisterFormProps
	extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {}

export const RegisterForm = ({ className }: RegisterFormProps) => {
	const searchParams = useSearchParams();
	const isInvite = searchParams.get("invite");
	const redirectPath = isInvite ? `/invite?token=${isInvite}` : "/login";
	const { handleSubmit, isExecuting } = useCreateAccount(redirectPath);
	const { handleGoogleLogin } = useLogin(redirectPath);
	const form = useForm<RegisterFormValues>({
		defaultValues: {
			displayName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
		resolver: zodResolver(RegisterSchema),
	});

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSubmit)}
				className={`space-y-4 ${className || ""}`}
			>
				<FormField
					control={form.control}
					name="displayName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									id="displayName"
									type="text"
									placeholder="John Doe"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
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
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									id="password"
									type="password"
									placeholder="Create a strong password"
									className="clay-input"
									{...field}
								/>
							</FormControl>
							<p className="text-xs text-clay-muted">
								Password must be at least 6 characters long.
							</p>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
							<FormControl>
								<Input
									id="confirmPassword"
									type="password"
									placeholder="Confirm your password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="w-full" disabled={isExecuting}>
					{isExecuting && <LoaderCircle />}Create Account
				</Button>
				<Button type="button" className="w-full" onClick={handleGoogleLogin}>
					<FaGoogle /> Sign in with Google
				</Button>
			</form>
		</Form>
	);
};
