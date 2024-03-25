import Image from 'next/image';
import {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardDescription,
	CardContent,
} from './ui/card';

export default function CardComponent({
	title,
	description,
	content,
	footer,
	image,
}) {
	return (
		<Card className="shadow-md">
			<Image
				className="w-full h-40 object-cover"
				src={image}
				alt="recipe image"
				height={100}
				width={200}
			/>
			<CardHeader>
				<CardTitle>{title}</CardTitle>
				<CardDescription className="line-clamp-3 lg:line-clamp-2">
					{description}
				</CardDescription>
			</CardHeader>

			<CardContent>{content}</CardContent>

			<CardFooter>{footer}</CardFooter>
		</Card>
	);
}
