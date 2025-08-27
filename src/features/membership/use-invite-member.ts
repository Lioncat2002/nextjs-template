import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { inviteMemberAction } from "./actions";

export const useInviteMember = () => {
	return useAction(inviteMemberAction, {
		onSuccess: (ctx) => {
			toast(`${ctx.input.name} \n ${ctx.input.role} \n ${ctx.input.email}`);
		},
		onError: (ctx) => {
			console.error("Invite member action failed:", ctx);
			toast(ctx.error.serverError);
		},
	});
};
