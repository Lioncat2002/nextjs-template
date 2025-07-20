import {
	ERROR_MESSAGES,
	StatusCodes,
} from "@/src/shared/constants/status-code-messages";
import { NextResponse } from "next/server";

export async function GET() {
	return NextResponse.json(
		{ ok: false, message: ERROR_MESSAGES[500], data: null },
		{ status: StatusCodes.HTTP_500_INTERNAL_SERVER_ERROR },
	);
}
