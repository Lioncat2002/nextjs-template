import type { User } from "@/src/entities/user/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui/avatar";
import { Badge } from "@/src/shared/ui/badge";

function getInitials(name: string) {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();
}

export const InviterCard = ({ inviter }: { inviter: User }) => {
	return (
		<div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg border">
			<Avatar className="h-12 w-12 border-2 border-border">
				<AvatarImage
					src={inviter.photoURL || undefined}
					alt={inviter.displayName || inviter.email}
				/>
				<AvatarFallback className="text-sm font-semibold bg-secondary text-secondary-foreground">
					{getInitials(inviter.displayName || inviter.email)}
				</AvatarFallback>
			</Avatar>

			<div className="flex-1 min-w-0 space-y-1">
				<div className="flex items-center gap-2">
					<p className="font-medium truncate">
						{inviter.displayName || inviter.email}
					</p>
					<Badge variant="outline" className="text-xs">
						Inviter
					</Badge>
				</div>
				<p className="text-sm text-muted-foreground truncate">
					{inviter.email}
				</p>
			</div>
		</div>
	);
};
