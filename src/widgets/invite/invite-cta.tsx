import type { CompanyInvitation } from "@/src/entities/invitation/types";
import { InviteCtaActions } from "@/src/features/membership/invite-cta-actions";
import { AlertCircle } from "lucide-react";

type InviteCtaProps = {
	invitation: CompanyInvitation;
	isExpired: boolean;
	isPending: boolean;
};

export const InviteCta = ({
	invitation,
	isExpired,
	isPending,
}: InviteCtaProps) => {
	if (!isPending || isExpired) {
		return (
			<div className="flex flex-col items-center justify-center py-8 text-center">
				<div className="p-4 rounded-full bg-muted mb-4">
					<AlertCircle className="h-6 w-6 text-muted-foreground" />
				</div>
				<p className="text-muted-foreground">
					{isExpired
						? "This invitation has expired"
						: `This invitation has been ${invitation.status.toLowerCase()}`}
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-4">
			<InviteCtaActions invitation={invitation} />
			<p className="text-xs text-muted-foreground text-center">
				By accepting, you&apos;ll become a member of this team and gain access
				to all shared resources.
			</p>
		</div>
	);
};
