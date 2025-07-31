import { cn } from "@/src/shared/lib/utils";
import { Button } from "@/src/shared/ui/button";
import { Building2, Plus } from "lucide-react";

type NotOnboardedPlaceholderProps = {
	className?: string;
};

export const NotOnboardedPlaceholder = ({
	className,
}: NotOnboardedPlaceholderProps) => {
	return (
		<div
			className={cn(
				"h-full w-full flex items-center justify-center",
				className,
			)}
		>
			<div className="text-center px-6 py-8">
				<div className="mb-6 relative inline-block">
					<div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto bg-muted">
						<Building2 className="w-8 h-8 text-muted-foreground" />
					</div>
					<div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto absolute top-0 right-0 bg-accent -translate-y-1/2 translate-x-1/2">
						<Plus className="w-6 h-6 text-accent-foreground" />
					</div>
				</div>

				<h3 className="text-lg font-semibold mb-2">Create an organization</h3>
				<p className="text-sm text-muted-foreground mb-6 leading-relaxed">
					Get started by creating your first organization to manage your
					projects and team.
				</p>

				<Button>
					<Plus className="w-4 h-4" />
					Create Organization
				</Button>
			</div>
		</div>
	);
};
