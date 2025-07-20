"use client";

import { Button } from "@/src/shared/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/shared/ui/card";
import { Input } from "@/src/shared/ui/input";
import { Label } from "@/src/shared/ui/label";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export const ResetPassword = () => {
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		setTimeout(() => {
			setIsLoading(false);
			setIsSubmitted(true);
			toast.success("Check your email for the password reset link.");
		}, 1000);
	};

	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<div className="inline-flex items-center space-x-2 mb-4">
						<Image
							src="/logo.png"
							alt="Company Logo"
							width={40}
							height={40}
							className="object-contain"
						/>{" "}
					</div>
					<h1 className="text-2xl font-bold">Forgot your password?</h1>
					<p className="mt-1">No worries, we'll help you reset it</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Reset Password</CardTitle>
						<CardDescription>
							Enter your email address and we'll send you a link to reset your
							password
						</CardDescription>
					</CardHeader>
					<CardContent>
						{isSubmitted ? (
							<div className="text-center p-4">
								<div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
									<svg
										className="h-6 w-6 text-green-600"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<title>Checkmark</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
								<h3 className="text-lg font-medium mb-2">Check your email</h3>
								<p className="mb-4">
									We've sent a password reset link to{" "}
									<span className="font-medium">{email}</span>
								</p>
								<p className="text-sm">
									Didn't receive the email? Check your spam folder or{" "}
									<button
										type="button"
										onClick={() => setIsSubmitted(false)}
										className="text-primary hover:underline"
									>
										try again
									</button>
								</p>
							</div>
						) : (
							<form onSubmit={handleSubmit} className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="email">Email address</Label>
									<Input
										id="email"
										type="email"
										placeholder="name@example.com"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>
								<Button type="submit" className="w-full" disabled={isLoading}>
									{isLoading ? "Sending link..." : "Send reset link"}
								</Button>
							</form>
						)}
					</CardContent>
					<CardFooter className="flex justify-center">
						<p className="text-sm">
							Remember your password?{" "}
							<Link href="/login" className="text-primary hover:underline">
								Back to login
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};
