import { NotOnboardedPlaceholder } from "@/src/features/onboarding/not-onboarded-placeholder";
import { requireSession } from "@/src/shared/auth/utils";
import { getUserUseCase } from "@/src/usecases/user";
import { redirect } from "next/navigation";

export default async function InitialOnboardingCheckPage() {
	const session = await requireSession();
	const user = await getUserUseCase({ firebaseUID: session.meta.uid });

	const isOnboarded = !!user.companies.length;
	if (isOnboarded) redirect(`/${user.companies[0].companyId}/home`);

	redirect("/onboarding");
}
