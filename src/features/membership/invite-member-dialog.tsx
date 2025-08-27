import { Button } from "@/src/shared/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/src/shared/ui/dialog";
import { PlusCircle } from "lucide-react";
import { InviteMemberForm } from "./forms/invite-form";

export const InviteMemberDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>
					<PlusCircle /> Invite Member
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Invite Member</DialogTitle>
					<DialogDescription>
						Invite a new member to your organization.
					</DialogDescription>
				</DialogHeader>
				<InviteMemberForm />
				<DialogClose asChild>
					<Button variant="outline">Close</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};
