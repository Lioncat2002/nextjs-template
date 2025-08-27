"use client";

export default function InvitationErrorPage({ error }: { error: Error }) {
	return (
		<div>
			<h1>Ooops!!</h1>
			<p>{error.message}</p>
		</div>
	);
}
