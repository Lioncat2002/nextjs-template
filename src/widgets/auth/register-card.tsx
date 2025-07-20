import { RegisterForm } from "@/src/features/auth/register-form";
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

export const RegisterCard = () => {
	return (
		<div className="min-h-screen flex items-center justify-center bg-clay-bg p-4">
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
					<h1 className="text-2xl font-bold">Create an account</h1>
					<p className="text-clay-muted mt-1">Sign up to get started</p>
				</div>

				<Card className="clay-card">
					<CardHeader>
						<CardTitle>Register</CardTitle>
						<CardDescription>
							Fill out the form to create your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<RegisterForm />
					</CardContent>
					<CardFooter className="flex justify-center">
						<p className="text-sm text-clay-muted">
							Already have an account?{" "}
							<Link href="/login" className="text-primary hover:underline">
								Sign in
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};
