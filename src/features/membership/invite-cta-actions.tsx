"use client";

import type { CompanyInvitation } from "@/src/entities/invitation/types";
import { Button } from "@/src/shared/ui/button";
import { Check, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useUpdateInvitationStatus } from "./use-update-invitation";

type InviteCtaActionsProps = {
	invitation: CompanyInvitation;
};

export const InviteCtaActions = ({ invitation }: InviteCtaActionsProps) => {
	const { execute, isExecuting } = useUpdateInvitationStatus();
	const [activeAction, setActiveAction] = useState<"accept" | "decline" | null>(
		null,
	);

	const handleAccept = async () => {
		setActiveAction("accept");
		execute({ token: invitation.token, status: "ACCEPTED" });
	};

	const handleDecline = async () => {
		setActiveAction("decline");
		execute({ token: invitation.token, status: "REVOKED" });
	};

	useEffect(() => {
		if (!isExecuting) {
			setActiveAction(null);
		}
	}, [isExecuting]);

	return (
		<div className="flex gap-3">
			<Button
				className="flex-1 h-12"
				size="lg"
				onClick={handleAccept}
				disabled={isExecuting}
			>
				{isExecuting && activeAction === "accept" ? (
					<Loader2 className="h-4 w-4 mr-2 animate-spin" />
				) : (
					<Check className="h-4 w-4 mr-2" />
				)}
				Accept Invitation
			</Button>

			<Button
				variant="outline"
				className="flex-1 h-12 bg-transparent"
				size="lg"
				onClick={handleDecline}
				disabled={isExecuting}
			>
				{isExecuting && activeAction === "decline" ? (
					<Loader2 className="h-4 w-4 mr-2 animate-spin" />
				) : (
					<X className="h-4 w-4 mr-2" />
				)}
				Decline
			</Button>
		</div>
	);
};
