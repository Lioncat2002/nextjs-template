import {
	AccountDeletedEmail,
	EmailVerificationEmail,
	InviteEmail,
	NotificationEmail,
	PasswordResetEmail,
	WelcomeEmail,
} from "@/src/shared/emails";
import { Button } from "@/src/shared/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/src/shared/ui/card";
import { ScrollArea } from "@/src/shared/ui/scroll-area";
import { render } from "@react-email/render";

const emailTemplates = [
	{
		id: "welcome",
		label: "👋 Welcome Email",
		html: await render(
			<WelcomeEmail userName="Utkarsh" companyName="YourApp" />,
			{ pretty: true },
		),
	},
	{
		id: "invite",
		label: "📩 Invite Email",
		html: await render(
			<InviteEmail
				inviterName="Admin"
				inviteUrl="https://yourapp.com/invite"
				teamName="Development Team"
				inviterEmail="admin@yourapp.com"
			/>,
			{ pretty: true },
		),
	},
	{
		id: "deleted",
		label: "🗑️ Account Deleted Email",
		html: await render(
			<AccountDeletedEmail
				userName="Utkarsh"
				deletionDate="January 15, 2025"
				feedbackUrl="https://yourapp.com/feedback"
			/>,
			{ pretty: true },
		),
	},
	{
		id: "password-reset",
		label: "🔐 Password Reset Email",
		html: await render(
			<PasswordResetEmail
				userName="Utkarsh"
				resetUrl="https://yourapp.com/reset-password?token=abc123"
			/>,
			{ pretty: true },
		),
	},
	{
		id: "email-verification",
		label: "✅ Email Verification",
		html: await render(
			<EmailVerificationEmail
				userName="Utkarsh"
				verificationUrl="https://yourapp.com/verify-email?token=xyz789"
			/>,
			{ pretty: true },
		),
	},
	{
		id: "notification-normal",
		label: "📢 Notification (Normal)",
		html: await render(
			<NotificationEmail
				userName="Utkarsh"
				title="New Feature Available"
				message="We've just released a new dashboard feature that helps you track your progress more effectively. Check it out in your account!"
				actionUrl="https://yourapp.com/dashboard"
				actionText="View Dashboard"
				priority="normal"
			/>,
			{ pretty: true },
		),
	},
	{
		id: "notification-high",
		label: "🚨 Notification (High Priority)",
		html: await render(
			<NotificationEmail
				userName="Utkarsh"
				title="Security Alert"
				message="We detected a new login to your account from an unrecognized device. If this wasn't you, please secure your account immediately."
				actionUrl="https://yourapp.com/security"
				actionText="Review Security"
				priority="high"
			/>,
			{ pretty: true },
		),
	},
	{
		id: "notification-low",
		label: "ℹ️ Notification (Low Priority)",
		html: await render(
			<NotificationEmail
				userName="Utkarsh"
				title="Weekly Summary"
				message="Here's a quick summary of your activity this week. You completed 5 tasks and achieved 3 milestones. Great work!"
				actionUrl="https://yourapp.com/reports"
				actionText="View Full Report"
				priority="low"
			/>,
			{ pretty: true },
		),
	},
];

export default function EmailPreviewPage() {
	return (
		<main className="px-2">
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
				{emailTemplates.map(({ id, label, html }) => (
					<Card key={id} className="overflow-hidden h-fit">
						<CardHeader>
							<CardTitle className="text-xl">{label}</CardTitle>
							<CardDescription>Email template preview</CardDescription>
						</CardHeader>

						<CardContent className="p-0">
							<div className="mx-4 mb-4">
								<div className="w-full h-96 overflow-auto resize-none flex flex-col">
									<ScrollArea className="h-1 flex-grow px-4">
										{/* biome-ignore lint/security/noDangerouslySetInnerHtml: <render email html> */}
										<div dangerouslySetInnerHTML={{ __html: html }} />
									</ScrollArea>
								</div>
							</div>
						</CardContent>

						<CardFooter className="flex justify-between items-center">
							<span className="text-sm text-muted-foreground">
								Template ID: {id}
							</span>
							<Button variant="outline" size="sm">
								View Source
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</main>
	);
}
