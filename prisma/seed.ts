import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const images = [
	'https://www.insidetherustickitchen.com/wp-content/uploads/2017/11/Italian-Beef-Ragu-740px-Inside-the-Rustic-Kitchen-26.jpg',
	'',
	'https://www.insidetherustickitchen.com/wp-content/uploads/2023/05/Rustici-Leccesi-2-Inside-the-Rustic-Kitchen-1.jpg',
	'https://www.insidetherustickitchen.com/wp-content/uploads/2023/12/Bagna-Cauda-1200px-Inside-the-Rustic-Kitchen-2.jpg',
	'https://www.insidetherustickitchen.com/wp-content/uploads/2020/06/La-Piadina-1200px-Inside-the-Rustic-Kitchen-3.jpg',
	'https://www.insidetherustickitchen.com/wp-content/uploads/2017/05/pasta-puttanesca-final-2-740x1110-inside-the-rustic-kitchen.jpg',
	'https://www.insidetherustickitchen.com/wp-content/uploads/2022/02/Pizzocchieri-1200px-Inside-the-Rustic-Kitchen-1.jpg',
	'',
	'https://www.insidetherustickitchen.com/wp-content/uploads/2021/03/Torta-Pasqualina-1200px-Inside-the-Rustic-Kitchen-2.jpg',
	'https://www.insidetherustickitchen.com/wp-content/uploads/2017/12/Lasagne-1200px-Inside-the-Rustic-Kitchen-1.jpg',
	'https://www.insidetherustickitchen.com/wp-content/uploads/2022/08/Shrimp-Spaghetti-2-1200px-Inside-the-Rustic-Kitchen-1.jpg',
	'https://www.insidetherustickitchen.com/wp-content/uploads/2022/03/Burrata-and-Anchovy-ciabatta1200px-Inside-the-Rustic-Kitchen-2.jpg',
	'',
];

const recipe = {
	id: 1,
	name: 'Test Name',
	description:
		'Italian ragù alla bolognese is a slowly cooked meat-based sauce, and its preparation involves several techniques, including sweating, sautéing and braising. Ingredients include a characteristic soffritto of onion, celery and carrot, different types of minced or finely chopped beef, often alongside small amounts of fatty pork. White wine, milk, and a small amount of tomato paste or tomato sauce are added, and the dish is then gently simmered at length to produce a thick sauce.',
	ingredients:
		'1 pound ground beef;1 medium onion chopped;4 cloves garlic minced;1 small green bell pepper diced;1 (28 ounce) can diced tomatoes;1 (16 ounce) can tomato sauce;1 (6 ounce) can tomato paste;2 teaspoons dried oregano;2 teaspoons dried basil;1 teaspoon salt;½ teaspoon ground black pepper',
	steps: 'step 1;step 2;step 3;step 4;step 5;step 6;step 7',
	tags: 'italian;beef;pasta;sauce',
};

async function main() {
	console.log('Start seeding ...');

	for (let id = 1; id <= images.length; id++) {
		const result = await prisma.recipe.upsert({
			where: { id },
			update: {},
			create: {
				name: recipe.name,
				description: recipe.description,
				ingredients: recipe.ingredients,
				steps: recipe.steps,
				tags: recipe.tags,
				minutes: Math.floor(Math.random() * 150),
				image: images[id - 1],
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
