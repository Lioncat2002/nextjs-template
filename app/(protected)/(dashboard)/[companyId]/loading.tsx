import { WaveLoader } from "@/src/shared/ui/wave-loader";

export default function LoadingPage() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center">
				{/* Wave Animation */}
				<WaveLoader />
			</div>
		</div>
	);
}
