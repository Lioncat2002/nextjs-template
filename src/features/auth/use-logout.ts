import { useAction } from "next-safe-action/hooks";
import { logoutUserAction } from "./action";

export const useLogout = () => {
	return useAction(logoutUserAction);
};
