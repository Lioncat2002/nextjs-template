import { getSession } from "@/src/shared/auth/session";
import { redirect } from "next/navigation";

export async function requireSession() {
	const session = await getSession();
	if (!session) redirect("/login");
	return session;
}
