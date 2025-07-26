import { ResetForm } from "@/src/features/auth/reset-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/shared/ui/card";
import Image from "next/image";
import Link from "next/link";

export const ResetPasswordCard = () => {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<div className="inline-flex items-center space-x-2 mb-4">
						<Image
							src="/logo.svg"
							alt="Company Logo"
							width={40}
							height={40}
							className="object-contain"
						/>{" "}
					</div>
					<h1 className="text-2xl font-bold">Forgot your password?</h1>
					<p className="mt-1">No worries, we&apos;ll help you reset it</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Reset Password</CardTitle>
						<CardDescription>
							Enter your email address and we&apos;ll send you a link to reset
							your password
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ResetForm />
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
