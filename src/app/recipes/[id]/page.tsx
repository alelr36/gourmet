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

	const {
		image,
		name,
		description,
		ingredients: stringIngredients,
		steps: stringSteps,
	} = recipe;

	const ingredients = stringIngredients.split(';');
	const steps = stringSteps.split(';');

	return (
		<article className="flex flex-col w-full px-12">
			{image ? (
				<Image
					className="w-full h-1/4 object-cover"
					src={image}
					alt="recipe image"
					height={100}
					width={200}
				/>
			) : (
				<div className="bg-secondary h-[10rem] flex justify-center items-center font-extrabold text-2xl text-gray-600">
					{name}
				</div>
			)}
			<div className="flex flex-col items-center my-12">
				<h1 className="text-6xl font-semibold">{name}</h1>
				<p className="py-6 text-lg italic w-full text-left">{description}</p>
				<ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 w-full">
					{ingredients.map((ingredient) => (
						<li key={ingredient}>{ingredient}</li>
					))}
				</ul>

				<section className="mt-12 w-full">
					{steps.map((step) => (
						<p key={step} className="w-full">
							{step}
						</p>
					))}
				</section>
			</div>
		</article>
	);
}
