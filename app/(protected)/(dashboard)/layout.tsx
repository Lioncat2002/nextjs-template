import { SidebarInset, SidebarProvider } from "@/src/shared/ui/sidebar";
import { AppSidebar } from "@/src/widgets/nav/dashboard/app-sidebar";
import { DashboardCrumb } from "@/src/widgets/nav/dashboard/crumb";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export default async function DashboardLayout({
	children,
}: DashboardLayoutProps) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<DashboardCrumb />
				<div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
