"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/src/shared/ui/breadcrumb";
import { SidebarTrigger } from "@/src/shared/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { usePathname } from "next/navigation";

// Helper function to format breadcrumb labels
const formatBreadcrumbLabel = (segment: string): string => {
	// Handle special cases
	const specialCases: Record<string, string> = {
		home: "Home",
		emails: "Email Management",
		settings: "Settings",
		profile: "Profile",
		analytics: "Analytics",
		// Add more mappings as needed
	};

	if (specialCases[segment.toLowerCase()]) {
		return specialCases[segment.toLowerCase()];
	}

	// Default formatting: capitalize first letter and replace hyphens/underscores with spaces
	return segment
		.split(/[-_]/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join(" ");
};

export const DashboardCrumb = () => {
	const pathname = usePathname();

	// Split pathname and filter out empty segments
	const pathSegments = pathname.split("/").filter(Boolean);

	// If we're at root or only have orgId, show minimal breadcrumb
	if (pathSegments.length <= 1) {
		return (
			<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
				<div className="flex items-center gap-2 px-4">
					<SidebarTrigger className="-ml-1" />
					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>
					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem>
								<BreadcrumbPage>Home</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
			</header>
		);
	}

	// Extract orgId and subsequent path segments (skip orgId for display)
	const [orgId, ...restSegments] = pathSegments;

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
			<div className="flex items-center gap-2 px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mr-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						{/* Application root breadcrumb - non-clickable */}
						<BreadcrumbItem className="hidden md:block">
							<BreadcrumbPage>Application</BreadcrumbPage>
						</BreadcrumbItem>

						{/* Render intermediate segments */}
						{restSegments.map((segment, index) => {
							const isLast = index === restSegments.length - 1;
							const href = `/${orgId}/${restSegments.slice(0, index + 1).join("/")}`;

							return (
								<div key={segment} className="flex items-center gap-2">
									<BreadcrumbSeparator className="hidden md:block" />
									<BreadcrumbItem>
										{isLast ? (
											<BreadcrumbPage>
												{formatBreadcrumbLabel(segment)}
											</BreadcrumbPage>
										) : (
											<BreadcrumbLink href={href}>
												{formatBreadcrumbLabel(segment)}
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
								</div>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
			</div>
		</header>
	);
};
