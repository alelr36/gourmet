import BadgeGroup from '@/components/BadgeGroup';
import Card from '@/components/Card';
import FadeContainer from '@/components/FadeContainer';
import prisma from '@/lib/db';
import Link from 'next/link';

export default async function Home() {
	const recipes = await prisma.recipe.findMany({});

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
			{recipes.map((recipe) => (
				<Link href={`/recipes/${recipe.id}`} key={recipe.id}>
					<Card
						content={
							<div className="mb-4">
								<BadgeGroup
									className="absolute top-0 right-0 m-4"
									values={[`${recipe.minutes} min`]}
									variant="secondary"
								/>
								<FadeContainer>
									<ul className="text-xs grid grid-cols-2 gap-x-4 max-h-24 overflow-hidden">
										{recipe.ingredients.split(';').map((ing) => (
											<li key={ing}>{ing}</li>
										))}
									</ul>
								</FadeContainer>
							</div>
						}
						title={recipe.name}
						description={recipe.description}
						footer={
							<div className="grow flex justify-end">
								<BadgeGroup
									className="mx-0.5"
									values={recipe.tags.split(';')}
								/>
							</div>
						}
						image={recipe.image}
					/>
				</Link>
			))}
		</div>
	);
}
