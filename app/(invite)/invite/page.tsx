import { getSession } from "@/src/shared/auth/session";
import { Separator } from "@/src/shared/ui/separator";
import { getInviteByTokenUsecase } from "@/src/usecases/membership/membership";
import { CompanyCard } from "@/src/widgets/invite/company-card";
import { InvitationDetailsCard } from "@/src/widgets/invite/invitation-details-card";
import { InviteCta } from "@/src/widgets/invite/invite-cta";
import { InviteHeader } from "@/src/widgets/invite/invite-header";
import { notFound, redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type InvitePageProps = {
	searchParams: Promise<{ token?: string }>;
};

export default async function InvitePage({ searchParams }: InvitePageProps) {
	const { token } = await searchParams;

	const inviteToken = token;
	if (!inviteToken) return notFound();

	const session = await getSession();
	if (!session) redirect(`/login?invite=${inviteToken}`);

	const invitation = await getInviteByTokenUsecase(inviteToken);

	return (
		<div className="min-h-screen bg-gradient-to-br from-background to-muted/20 relative">
			<div className="container max-w-4xl mx-auto px-4 pt-8 pb-44">
				{/* pb-32 ensures content won’t hide behind CTA */}
				<div className="space-y-8">
					{/* Header Section */}
					<div className="text-center">
						<InviteHeader />
					</div>

					{/* Main Invitation Card */}
					<div className="bg-card border rounded-xl shadow-sm p-8 space-y-8">
						{/* Company Introduction */}
						<div className="space-y-6">
							<CompanyCard company={invitation.company} />
						</div>

						<Separator />

						{/* Invitation Details Section */}
						<div className="space-y-6">
							<InvitationDetailsCard invitation={invitation} />
						</div>
					</div>
				</div>
			</div>

			{/* Fixed CTA */}
			<div className="fixed bottom-0 left-0 right-0 bg-card p-4 shadow-lg border-t">
				<InviteCta invitation={invitation} isExpired={false} isPending={true} />
			</div>
		</div>
	);
}
