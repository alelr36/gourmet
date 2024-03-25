import Card from '@/components/Card';
import prisma from '@/lib/db';

export default async function Home() {
	const recipes = await prisma.recipe.findMany({});

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
			{recipes.map((recipe) => (
				<Card
					key={recipe.id}
					content={
						<ul className="text-xs grid grid-cols-2 gap-x-4">
							{recipe.ingredients.split(';').map((ing) => (
								<li key={ing}>{ing}</li>
							))}
						</ul>
					}
					title={recipe.name}
					description={recipe.description}
					footer={recipe.tags}
					image={recipe.image}
				/>
			))}
		</div>
	);
}
