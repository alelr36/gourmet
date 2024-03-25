import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const recipe = {
	id: 1,
	name: 'Spaghetti alla Bolognese',
	description:
		'Italian ragù alla bolognese is a slowly cooked meat-based sauce, and its preparation involves several techniques, including sweating, sautéing and braising. Ingredients include a characteristic soffritto of onion, celery and carrot, different types of minced or finely chopped beef, often alongside small amounts of fatty pork. White wine, milk, and a small amount of tomato paste or tomato sauce are added, and the dish is then gently simmered at length to produce a thick sauce.',
	ingredients:
		'1 pound ground beef;1 medium onion chopped;4 cloves garlic minced;1 small green bell pepper diced;1 (28 ounce) can diced tomatoes;1 (16 ounce) can tomato sauce;1 (6 ounce) can tomato paste;2 teaspoons dried oregano;2 teaspoons dried basil;1 teaspoon salt;½ teaspoon ground black pepper',
	steps: 'step 1;step 2;step 3;step 4;step 5;step 6;step 7',
	tags: 'italian;beef;pasta;sauce',
	image:
		'https://upload.wikimedia.org/wikipedia/commons/4/4d/Tagliatelle_al_rag%C3%B9_%28image_modified%29.jpg',
};

async function main() {
	console.log('Start seeding ...');

	for (let id = 1; id <= 10; id++) {
		const result = await prisma.recipe.upsert({
			where: { id },
			update: {},
			create: {
				name: recipe.name,
				description: recipe.description,
				ingredients: recipe.ingredients,
				steps: recipe.steps,
				tags: recipe.tags,
				image: recipe.image,
			},
		});
		console.log(`Created recipe with id: ${result.id}`);
	}

	console.log('Seeding finished.');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
