import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Text,
	render,
} from "@react-email/components";

export const WelcomeEmail = ({
	userName = "User",
	companyName = "our platform",
	dashboardUrl = "https://yourapp.com/dashboard",
	supportEmail = "support@yourapp.com",
}: {
	userName?: string;
	companyName?: string;
	dashboardUrl?: string;
	supportEmail?: string;
}) => (
	<Html>
		<Head />
		<Preview>Welcome to {companyName} - Let&apos;s get started!</Preview>
		<Body>
			<Container>
				<Text>
					👋 Welcome to {companyName}, {userName}!
				</Text>
				<Text>
					We&apos;re thrilled to have you join our community. Your account is
					now active and ready to use.
				</Text>
				<Text>Here&apos;s what you can do next:</Text>
				<Text>• Complete your profile setup</Text>
				<Text>• Explore the dashboard features</Text>
				<Text>• Connect with other users</Text>

				<Section>
					<Button href={dashboardUrl}>Get Started</Button>
				</Section>

				<Hr />
				<Text>
					Need help getting started? Reply to this email or contact us at{" "}
					<Link href={`mailto:${supportEmail}`}>{supportEmail}</Link>.
				</Text>
			</Container>
		</Body>
	</Html>
);

export const LoginNotificationEmail = ({
	userName = "User",
	loginTime,
	location = "an unknown location",
	device = "a new device",
	supportEmail = "support@yourapp.com",
}: {
	userName?: string;
	loginTime: string;
	location?: string;
	device?: string;
	supportEmail?: string;
}) => (
	<Html>
		<Head />
		<Preview>New Login Detected</Preview>
		<Body>
			<Container>
				<Text>Hi {userName},</Text>
				<Text>
					We noticed a new login to your account on <strong>{device}</strong>{" "}
					from <strong>{location}</strong> at <strong>{loginTime}</strong>.
				</Text>
				<Text>
					If this was you, no further action is needed. If you don&apos;t
					recognize this activity, we recommend changing your password
					immediately.
				</Text>

				<Section>
					<Button href="https://yourapp.com/account/security">
						Secure Your Account
					</Button>
				</Section>

				<Hr />
				<Text>
					Need help? Reach out to us at{" "}
					<Link href={`mailto:${supportEmail}`}>{supportEmail}</Link>.
				</Text>
			</Container>
		</Body>
	</Html>
);

export const InviteEmail = ({
	inviterName = "Someone",
	inviterEmail,
	teamName,
	inviteUrl,
	expiresIn = "3 days",
}: {
	inviterName?: string;
	inviterEmail?: string;
	teamName?: string;
	inviteUrl: string;
	expiresIn?: string;
}) => (
	<Html>
		<Head />
		<Preview>
			{inviterName} invited you to join {teamName || "their team"}!
		</Preview>
		<Body
			style={{
				backgroundColor: "#f5f7fa",
				fontFamily: "Arial, sans-serif",
				padding: "20px",
			}}
		>
			<Container
				style={{
					maxWidth: "520px",
					margin: "0 auto",
					backgroundColor: "#ffffff",
					borderRadius: "8px",
					padding: "32px",
					boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
				}}
			>
				{/* Logo / Header */}
				{/* <Section style={{ textAlign: "center", marginBottom: "24px" }}>
          <Img
            src="https://dummyimage.com/120x40/007bff/ffffff&text=Logo"
            width="120"
            alt="Company Logo"
            style={{ margin: "0 auto" }}
          />
        </Section> */}

				{/* Main Invite Text */}
				<Text
					style={{
						fontSize: "20px",
						fontWeight: "bold",
						marginBottom: "16px",
						textAlign: "center",
						color: "#333",
					}}
				>
					🎉 You&apos;ve been invited to join {teamName || "a team"}!
				</Text>

				<Text style={{ fontSize: "16px", marginBottom: "16px", color: "#444" }}>
					{inviterName}
					{inviterEmail ? ` (${inviterEmail})` : ""} has invited you to
					collaborate.
				</Text>

				<Text style={{ fontSize: "15px", marginBottom: "12px", color: "#444" }}>
					By accepting this invitation, you&apos;ll get access to:
				</Text>

				<Text style={{ fontSize: "15px", marginBottom: "8px", color: "#444" }}>
					• Shared projects and resources <br />• Team collaboration tools{" "}
					<br />• Direct communication with team members
				</Text>

				<Section style={{ textAlign: "center", margin: "28px 0" }}>
					<Button
						style={{
							backgroundColor: "#007bff",
							color: "#ffffff",
							padding: "12px 24px",
							borderRadius: "6px",
							fontSize: "16px",
							fontWeight: "bold",
							textDecoration: "none",
							display: "inline-block",
						}}
					>
						<Link href={inviteUrl}>Accept Invitation</Link>
					</Button>
				</Section>

				{/* Expiry */}
				<Text style={{ fontSize: "14px", color: "#666", marginTop: "12px" }}>
					<strong>This invitation expires in {expiresIn}.</strong>
				</Text>

				{/* Backup link */}
				<Text style={{ fontSize: "13px", color: "#666", marginTop: "16px" }}>
					Or copy and paste this link in your browser: <br />
					<Link href={inviteUrl} style={{ color: "#007bff" }}>
						{inviteUrl}
					</Link>
				</Text>

				<Hr style={{ margin: "28px 0", borderColor: "#eee" }} />

				{/* Footer */}
				<Text style={{ fontSize: "12px", color: "#999", textAlign: "center" }}>
					If you weren&apos;t expecting this invitation or don&apos;t know{" "}
					{inviterName}, you can safely ignore this email.
				</Text>

				<Text
					style={{
						fontSize: "12px",
						color: "#999",
						textAlign: "center",
						marginTop: "16px",
					}}
				>
					© {new Date().getFullYear()} {teamName || "Our Company"}. All rights
					reserved.
				</Text>
			</Container>
		</Body>
	</Html>
);

export const AccountDeletedEmail = ({
	userName = "User",
	deletionDate,
	supportEmail = "support@yourapp.com",
	feedbackUrl,
}: {
	userName?: string;
	deletionDate?: string;
	supportEmail?: string;
	feedbackUrl?: string;
}) => (
	<Html>
		<Head />
		<Preview>Your account has been successfully deleted</Preview>
		<Body>
			<Container>
				<Text>Hi {userName},</Text>
				<Text>
					Your account has been successfully deleted
					{deletionDate ? ` on ${deletionDate}` : ""}. All your data has been
					permanently removed from our servers.
				</Text>
				<Text>
					We&apos;re sorry to see you go and appreciate the time you spent with
					us.
				</Text>

				{feedbackUrl && (
					<Section>
						<Text>
							Before you go, would you mind sharing why you decided to leave?
							Your feedback helps us improve.
						</Text>
						<Button href={feedbackUrl}>Share Feedback</Button>
					</Section>
				)}

				<Text>
					<strong>Important:</strong> If this deletion was a mistake or
					unauthorized, please contact us immediately at{" "}
					<Link href={`mailto:${supportEmail}`}>{supportEmail}</Link>.
				</Text>

				<Hr />
				<Text>
					This action is irreversible. Thank you for being part of our
					community.
				</Text>
			</Container>
		</Body>
	</Html>
);

export const PasswordResetEmail = ({
	userName = "User",
	resetUrl,
	expiresIn = "1 hour",
}: {
	userName?: string;
	resetUrl: string;
	expiresIn?: string;
}) => (
	<Html>
		<Head />
		<Preview>Reset your password</Preview>
		<Body>
			<Container>
				<Text>🔐 Password Reset Request</Text>
				<Text>Hi {userName},</Text>
				<Text>
					We received a request to reset your password. Click the button below
					to create a new password.
				</Text>

				<Section>
					<Button href={resetUrl}>Reset Password</Button>
				</Section>

				<Text>
					<strong>This link expires in {expiresIn}.</strong>
				</Text>
				<Text>
					If you didn&apos;t request a password reset, you can safely ignore
					this email. Your password won&apos;t be changed.
				</Text>

				<Hr />
				<Text>For security reasons, this link can only be used once.</Text>
			</Container>
		</Body>
	</Html>
);

export const EmailVerificationEmail = ({
	userName = "User",
	verificationUrl,
	expiresIn = "24 hours",
}: {
	userName?: string;
	verificationUrl: string;
	expiresIn?: string;
}) => (
	<Html>
		<Head />
		<Preview>Please verify your email address</Preview>
		<Body>
			<Container>
				<Text>✅ Verify Your Email Address</Text>
				<Text>Hi {userName},</Text>
				<Text>
					Thanks for signing up! To complete your registration and secure your
					account, please verify your email address.
				</Text>

				<Section>
					<Button href={verificationUrl}>Verify Email</Button>
				</Section>

				<Text>
					<strong>This verification link expires in {expiresIn}.</strong>
				</Text>
				<Text>
					If you didn&apos;t create this account, you can safely ignore this
					email.
				</Text>

				<Hr />
				<Text>
					Once verified, you&apos;ll have full access to all features.
				</Text>
			</Container>
		</Body>
	</Html>
);

export const NotificationEmail = ({
	userName = "User",
	title,
	message,
	actionUrl,
	actionText,
	priority = "normal",
}: {
	userName?: string;
	title: string;
	message: string;
	actionUrl?: string;
	actionText?: string;
	priority?: "low" | "normal" | "high";
}) => {
	const emoji = priority === "high" ? "🚨" : priority === "low" ? "ℹ️" : "📢";

	return (
		<Html>
			<Head />
			<Preview>{title}</Preview>
			<Body>
				<Container>
					<Text>
						{emoji} {title}
					</Text>
					<Text>Hi {userName},</Text>
					<Text>{message}</Text>

					{actionUrl && actionText && (
						<Section>
							<Button href={actionUrl}>{actionText}</Button>
						</Section>
					)}

					<Hr />
					<Text>
						You&apos;re receiving this because of your notification preferences.
						You can update these in your account settings.
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

//helper to directly return html string to be used for email-sending services as cannot import a <Component/> in a .ts file

export const renderWelcomeEmail = (
	props: React.ComponentProps<typeof WelcomeEmail>,
) => {
	return render(<WelcomeEmail {...props} />);
};

export const renderInviteEmail = (
	props: React.ComponentProps<typeof InviteEmail>,
) => {
	return render(<InviteEmail {...props} />);
};

export const renderAccountDeletedEmail = (
	props: React.ComponentProps<typeof AccountDeletedEmail>,
) => {
	return render(<AccountDeletedEmail {...props} />);
};

export const renderPasswordResetEmail = (
	props: React.ComponentProps<typeof PasswordResetEmail>,
) => {
	return render(<PasswordResetEmail {...props} />);
};

export const renderEmailVerificationEmail = (
	props: React.ComponentProps<typeof EmailVerificationEmail>,
) => {
	return render(<EmailVerificationEmail {...props} />);
};

export const renderNotificationEmail = (
	props: React.ComponentProps<typeof NotificationEmail>,
) => {
	return render(<NotificationEmail {...props} />);
};

export const renderLoginNotificationEmail = (
	props: React.ComponentProps<typeof LoginNotificationEmail>,
) => {
	return render(<LoginNotificationEmail {...props} />);
};
