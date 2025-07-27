"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { SessionModel } from "./session-option";

type AuthContextType = {
	session: SessionModel | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
	const ctx = useContext(AuthContext);
	if (!ctx) {
		throw new Error("useAuth must be used within an <AuthProvider>");
	}
	return ctx;
};

export const AuthProvider = ({
	session: serverSession,
	children,
}: {
	session: SessionModel | null;
	children: React.ReactNode;
}) => {
	const [session, setSession] = useState<SessionModel | null>(serverSession);

	useEffect(() => {
		setSession(serverSession);
	}, [serverSession]);

	return (
		<AuthContext.Provider value={{ session }}>{children}</AuthContext.Provider>
	);
};
