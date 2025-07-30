"use client";

import type { OrgMembership } from "@/src/entities/membership/types";
import type { Organization } from "@/src/entities/organization/types";
import type { User } from "@/src/entities/user/types";
import { type ReactNode, createContext, useContext } from "react";

type UserContextValue = {
	user: User;
	memberships: (OrgMembership & { company: Organization })[];
};

const UserContext = createContext<UserContextValue>(undefined as never);

export const useUser = (): UserContextValue => {
	const ctx = useContext(UserContext);
	if (!ctx) {
		throw new Error("useUser must be used within a UserContextProvider");
	}
	return ctx;
};

export const UserContextProvider = ({
	value,
	children,
}: {
	value: UserContextValue;
	children: ReactNode;
}) => {
	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
