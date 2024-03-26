export default function FadeContainerComponent({ children }) {
	return (
		<div className="relative">
			{children}
			<div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-background"></div>
		</div>
	);
}
