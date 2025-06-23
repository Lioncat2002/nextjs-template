import { AuthProvider } from "./auth-provider";
import { createSessionManager } from "./session";

export const SessionWrapper = async ({ children }: { children: React.ReactNode }) => {
    const { getSession } = createSessionManager();
    const session = await getSession();
	return <AuthProvider session={session}>{children}</AuthProvider>;
};