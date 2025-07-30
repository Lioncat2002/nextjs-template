export default function Loading() {
	return (
		<div className="min-h-screen bg-background flex items-center justify-center">
			<div className="text-center">
				{/* Wave Animation */}
				<div className="flex space-x-2 mb-8">
					{[...Array(5)].map((_, i) => (
						<div
							// biome-ignore lint/suspicious/noArrayIndexKey: <static array>
							key={i}
							className="w-4 h-16 bg-primary rounded-full animate-bounce"
							style={{
								animationDelay: `${i * 0.75}s`,
							}}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
