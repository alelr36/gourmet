import { Badge, BadgeVariant, BadgeProps } from './ui/badge';

type BadgeGroupProps = BadgeProps & {
	values: string[];
	selectedValue?: string;
	variant?: BadgeVariant;
	selectedVariant?: BadgeVariant;
};

export default function BadgeGroupComponent({
	values,
	selectedValue,
	variant,
	selectedVariant,
	...rest
}: BadgeGroupProps) {
	return (
		<>
			{values.map((value) => (
				<Badge
					key={value}
					variant={selectedValue === value ? selectedVariant : variant}
					{...rest}
				>
					{value}
				</Badge>
			))}
		</>
	);
}
