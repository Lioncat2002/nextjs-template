import { createSessionManager } from "@/src/shared/auth/session";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
	const { destroySession } = createSessionManager();
	await destroySession();
	return NextResponse.json(
		{ ok: true, message: "Logout successful", data: null },
		{ status: 200 },
	);
}
