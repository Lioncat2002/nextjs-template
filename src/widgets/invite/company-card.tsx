import type { Organization } from "@/src/entities/organization/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/src/shared/ui/avatar";
import { Globe, MapPin } from "lucide-react";

function getInitials(name: string) {
	return name
		.split(" ")
		.map((n) => n[0])
		.join("")
		.toUpperCase();
}

export const CompanyCard = ({ company }: { company: Organization }) => {
	return (
		<div className="flex flex-col items-center text-center space-y-6">
			<Avatar className="h-24 w-24 border-4 border-primary/20 shadow-lg">
				<AvatarImage src={company.logo || undefined} alt={company.name} />
				<AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
					{getInitials(company.name)}
				</AvatarFallback>
			</Avatar>

			<div className="space-y-2">
				<h2 className="text-2xl font-bold">{company.name}</h2>
				<p className="text-muted-foreground">wants you to join their team</p>
			</div>

			<div className="flex flex-wrap justify-center gap-4 text-sm">
				{company.location && (
					<div className="flex items-center gap-2 text-muted-foreground bg-muted/50 rounded-full px-3 py-1">
						<MapPin className="h-3.5 w-3.5" />
						<span>{company.location}</span>
					</div>
				)}
				{company.website && (
					<div className="flex items-center gap-2">
						<Globe className="h-3.5 w-3.5 text-muted-foreground" />
						<a
							href={company.website}
							target="_blank"
							rel="noopener noreferrer"
							className="text-primary hover:underline font-medium"
						>
							{company.website.replace(/^https?:\/\//, "")}
						</a>
					</div>
				)}
			</div>
		</div>
	);
};
