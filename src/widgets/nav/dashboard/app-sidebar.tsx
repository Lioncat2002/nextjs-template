"use client";

import { useUser } from "@/src/features/user/user-context";
import { ScrollArea } from "@/src/shared/ui/scroll-area";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/src/shared/ui/sidebar";
import {
	AudioWaveform,
	BookOpen,
	Bot,
	Command,
	Frame,
	GalleryVerticalEnd,
	Map as MapIcon,
	PieChart,
	Settings2,
	SquareTerminal,
	Users,
} from "lucide-react";
import { useMemo } from "react";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavSettings } from "./nav-settings";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

// This is sample data.
const data = {
	teams: [
		{
			name: "Acme Inc",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],
	navMain: [
		{
			title: "Playground",
			url: "#",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "History",
					url: "#",
				},
				{
					title: "Starred",
					url: "#",
				},
				{
					title: "Settings",
					url: "#",
				},
			],
		},
		{
			title: "Models",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
					url: "#",
				},
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
					url: "#",
				},
			],
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: MapIcon,
		},
	],
	settings: [
		{
			title: "General",
			url: "#",
			icon: Settings2,
			items: [
				{
					title: "Company",
					url: "#",
				},
				{
					title: "Billing & Limits",
					url: "#",
				},
				{
					title: "Email Templates",
					url: "emails",
				},
			],
		},
		{
			title: "Team",
			url: "#",
			icon: Users,
			items: [
				{
					title: "Members",
					url: "members",
				},
			],
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const { user, memberships } = useUser();

	const companies = useMemo(() => {
		return memberships.map((m) => {
			return {
				id: m.company.id,
				name: m.company.name,
				logo: m.company.logo,
			};
		});
	}, [memberships]);

	const isOnboarded = !!companies.length;

	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher teams={companies} />
			</SidebarHeader>
			<SidebarContent className="flex flex-col h-full">
				<ScrollArea className="h-1 flex-grow">
					<NavMain items={data.navMain} isOnboarded={isOnboarded} />
					<NavProjects projects={data.projects} isOnboarded={isOnboarded} />
					<NavSettings items={data.settings} isOnboarded={isOnboarded} />
				</ScrollArea>
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
