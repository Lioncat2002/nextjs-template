import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateInvitationStatusAction } from "./actions";

export const useUpdateInvitationStatus = () => {
	const router = useRouter();
	return useAction(updateInvitationStatusAction, {
		onSuccess: (ctx) => {
			toast(`Invitation status updated to ${ctx.input.status}`);
			router.push(`/${ctx.data.companyId}/home`);
		},
		onError: (ctx) => {
			console.error("Update invitation status action failed:", ctx);
			toast(ctx.error.serverError);
		},
	});
};
