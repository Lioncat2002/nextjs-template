import { env } from "@/src/config";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export type SendEmailOptions = {
	to: string | string[];
	subject: string;
	html: string; // render from React Email outside
	from?: string; // optional override
};

export async function sendEmail({ to, subject, html, from }: SendEmailOptions) {
	try {
		const result = await resend.emails.send({
			from: "contact@template.bunnylabs.dev",
			to,
			subject,
			html,
		});

		if (result.error) {
			console.log(result.error);
			// biome-ignore lint/suspicious/noExplicitAny: <resend sends error message in error.errror, invalid ErrorResponse type; does not know it is like that>
			throw new Error((result.error as any).error);
		}

		return result;
	} catch (error) {
		console.error("Failed to send email:", error);
		throw error;
	}
}
