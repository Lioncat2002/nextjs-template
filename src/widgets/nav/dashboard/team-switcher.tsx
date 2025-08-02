import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/src/shared/ui/dropdown-menu";
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/src/shared/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { ChevronsUpDown, Plus } from "lucide-react";
import { useState } from "react";

export const TeamSwitcher = ({
	teams,
}: {
	teams: {
		id: string;
		name: string;
		logo: string | null;
	}[];
}) => {
	const { isMobile } = useSidebar();
	const [activeTeam, setActiveTeam] = useState(teams[0]);

	if (!teams.length) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<div className="bg-muted text-muted-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
									<Plus className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium text-muted-foreground">
										No teams
									</span>
									<span className="truncate text-xs text-muted-foreground">
										Create your first team
									</span>
								</div>
								<ChevronsUpDown className="ml-auto size-4" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="min-w-56 rounded-lg"
							align="start"
							side={isMobile ? "bottom" : "right"}
							sideOffset={4}
						>
							<DropdownMenuLabel className="text-muted-foreground text-xs">
								Teams
							</DropdownMenuLabel>
							<DropdownMenuItem className="gap-2 p-2">
								<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
									<Plus className="size-4" />
								</div>
								<div className="text-muted-foreground font-medium">
									Create team
								</div>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		);
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton
							size="lg"
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground space-x-2"
						>
							{activeTeam.logo ? (
								<Avatar className="size-8">
									<AvatarImage
										src={activeTeam.logo || "/placeholder.svg"}
										alt={activeTeam.name}
									/>
									<AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs font-semibold">
										{activeTeam.name.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							) : (
								<Avatar className="size-8 inline-flex items-center justify-center p-4">
									<AvatarFallback className="bg-muted text-muted-foreground text-sm font-semibold py-2 px-3 rounded-sm">
										{activeTeam.name.slice(0, 2).toUpperCase()}
									</AvatarFallback>
								</Avatar>
							)}
							<div className="grid flex-1 text-left text-sm leading-tight">
								<span className="truncate font-medium">{activeTeam.name}</span>
								<span className="truncate text-xs text-muted-foreground">
									Active team
								</span>
							</div>
							<ChevronsUpDown className="ml-auto size-4" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						className="min-w-56 rounded-lg"
						align="start"
						side={isMobile ? "bottom" : "right"}
						sideOffset={4}
					>
						<DropdownMenuLabel className="text-muted-foreground text-xs">
							Teams
						</DropdownMenuLabel>
						{teams.map((team) => (
							<DropdownMenuItem key={team.id} className="gap-2 p-2">
								{team.logo ? (
									<Avatar className="size-6">
										<AvatarImage
											src={team.logo || "/placeholder.svg"}
											alt={team.name}
										/>
										<AvatarFallback className="text-xs font-medium text-muted-foreground">
											{team.name.slice(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								) : (
									<Avatar className="size-6">
										<AvatarFallback className="text-xs font-medium text-muted-foreground">
											{team.name.slice(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
								)}
								<div className="text-muted-foreground font-medium">
									{team.name}
								</div>
							</DropdownMenuItem>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	);
};
