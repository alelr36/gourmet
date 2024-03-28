import { ReactNode } from 'react';

type FadeContainerComponentProps = {
	children: ReactNode;
};

export default function FadeContainerComponent({
	children,
}: FadeContainerComponentProps) {
	return (
		<div className="relative">
			{children}
			<div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-background"></div>
		</div>
	);
}
