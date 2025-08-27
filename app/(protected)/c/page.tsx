import { requireSession } from "@/src/shared/auth/utils";
import { getUserUseCase } from "@/src/usecases/user/user";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function InitialOnboardingCheckPage() {
	const session = await requireSession();
	const user = await getUserUseCase({ firebaseUID: session.meta.uid });

	const isOnboarded = !!user.companies.length;
	if (isOnboarded) redirect(`/${user.companies[0].companyId}/home`);

	redirect("/onboarding");
}
