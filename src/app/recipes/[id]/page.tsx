import prisma from '@/lib/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export default async function RecipePage({ params }) {
	const recipe = await prisma.recipe.findUnique({
		where: {
			id: parseInt(params.id),
		},
	});

	if (!recipe) {
		return notFound();
	}
	return (
		<div>
			<Image
				className="w-full h-40 object-cover"
				src={recipe.image}
				alt="recipe image"
				height={100}
				width={200}
			/>
			<div>Recipe Page for recipe {params.id}</div>
		</div>
	);
}
