import { UserContextProvider } from "@/src/features/user/user-context";
import { AuthProvider } from "@/src/shared/auth/auth-provider";
import { getSession } from "@/src/shared/auth/session";
import { getUserUseCase } from "@/src/usecases/user/user";
import { redirect } from "next/navigation";

type ProtectedLayoutProps = {
	children: React.ReactNode;
};

export default async function ProtectedLayout({
	children,
}: ProtectedLayoutProps) {
	const session = await getSession();

	if (!session) {
		redirect("/login");
	}

	const user = await getUserUseCase({ firebaseUID: session.meta.uid });

	return (
		<AuthProvider session={session}>
			<UserContextProvider
				value={{
					user: user,
					memberships: user.companies,
				}}
			>
				{children}
			</UserContextProvider>
		</AuthProvider>
	);
}
