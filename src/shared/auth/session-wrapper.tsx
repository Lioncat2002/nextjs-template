import { AuthProvider } from "./auth-provider";
import { getSession } from "./session";

export const SessionWrapper = async ({
	children,
}: { children: React.ReactNode }) => {
	const session = await getSession();
	return <AuthProvider session={session}>{children}</AuthProvider>;
};
