import { cn } from "../lib/utils";

type LoaderProps = {
    className?: string;
}
export const WaveLoader = ({ className }: LoaderProps) => {
	return (
		<div className={cn("flex space-x-2 mb-8", className)}>
			{[...Array(5)].map((_, i) => (
				<div
					// biome-ignore lint/suspicious/noArrayIndexKey: <static array>
					key={i}
					className="w-4 h-16 bg-primary rounded-full animate-bounce"
					style={{
						animationDelay: `${-i * 0.75}s`,
					}}
				/>
			))}
		</div>
	);
};