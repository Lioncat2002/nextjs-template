import type { CompanyInvitation } from "@/src/entities/invitation/types";
import { Badge } from "@/src/shared/ui/badge";
import { Briefcase, Calendar, Clock, Mail } from "lucide-react";

function formatDate(date: Date) {
	return new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(new Date(date));
}

export const InvitationDetailsCard = ({
	invitation,
}: { invitation: CompanyInvitation }) => {
	return (
		<div className="space-y-4 p-4 bg-muted/30 rounded-lg border">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-full bg-primary/10">
						<Briefcase className="h-4 w-4 text-primary" />
					</div>
					<span className="font-medium">Your Role</span>
				</div>
				<Badge variant="default" className="font-medium">
					{invitation.role}
				</Badge>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-full bg-muted">
						<Clock className="h-4 w-4 text-muted-foreground" />
					</div>
					<span className="font-medium">Status</span>
				</div>
				<Badge
					variant={invitation.status === "PENDING" ? "secondary" : "default"}
				>
					{invitation.status}
				</Badge>
			</div>

			<div className="space-y-2">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-full bg-muted">
						<Mail className="h-4 w-4 text-muted-foreground" />
					</div>
					<span className="font-medium">Invitation Email</span>
				</div>
				<p className="text-sm text-muted-foreground bg-background rounded-md px-3 py-2 font-mono border">
					{invitation.email}
				</p>
			</div>

			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="p-2 rounded-full bg-muted">
						<Calendar className="h-4 w-4 text-muted-foreground" />
					</div>
					<span className="font-medium">Sent</span>
				</div>
				<span className="text-sm text-muted-foreground">
					{formatDate(invitation.createdAt)}
				</span>
			</div>
		</div>
	);
};
