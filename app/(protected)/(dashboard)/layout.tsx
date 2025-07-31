import { UserContextProvider } from "@/src/features/user/user-context";
import { AuthProvider } from "@/src/shared/auth/auth-provider";
import { getSession } from "@/src/shared/auth/session";
import { SidebarInset, SidebarProvider } from "@/src/shared/ui/sidebar";
import { getUserUseCase } from "@/src/usecases/user";
import { AppSidebar } from "@/src/widgets/nav/dashboard/app-sidebar";
import { DashboardCrumb } from "@/src/widgets/nav/dashboard/crumb";
import { redirect } from "next/navigation";

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
