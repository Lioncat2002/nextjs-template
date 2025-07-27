import { LoginForm } from "@/src/features/auth/login-form";
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

export const LoginCard = () => {
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
					<h1 className="text-2xl font-bold">Welcome back</h1>
					<p className="text-clay-muted mt-1">Sign in to your account</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>
							Enter your credentials to continue
						</CardDescription>
					</CardHeader>
					<CardContent>
						<LoginForm />
					</CardContent>
					<CardFooter className="flex justify-center">
						<p className="text-sm text-clay-muted">
							Don&apos;t have an account?{" "}
							<Link href="/register" className="text-primary hover:underline">
								Sign up
							</Link>
						</p>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
};
