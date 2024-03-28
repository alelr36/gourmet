import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const methods = ['Roasted', 'Grilled', 'Boiled', 'Smoked', 'Fried', 'Aged'];
const meats = ['Chicken', 'Beef', 'Fish', 'Lamb', 'Turkey', 'Octopus'];
const sides = [
	'Potatoes',
	'Spaghetti',
	'Vegetables',
	'Onions',
	'Mushrooms',
	'Salad',
];

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
	description:
		'Italian ragù alla bolognese is a slowly cooked meat-based sauce, and its preparation involves several techniques, including sweating, sautéing and braising. Ingredients include a characteristic soffritto of onion, celery and carrot, different types of minced or finely chopped beef, often alongside small amounts of fatty pork. White wine, milk, and a small amount of tomato paste or tomato sauce are added, and the dish is then gently simmered at length to produce a thick sauce.',
	ingredients:
		'1 pound ground beef;1 medium onion chopped;4 cloves garlic minced;1 small green bell pepper diced;1 (28 ounce) can diced tomatoes;1 (16 ounce) can tomato sauce;1 (6 ounce) can tomato paste;2 teaspoons dried oregano;2 teaspoons dried basil;1 teaspoon salt;½ teaspoon ground black pepper',
	steps:
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.;Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.;Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.;Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.;Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.;Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.;At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
	tags: 'italian;beef;pasta;sauce',
};

async function main() {
	console.log('Start seeding ...');

	for (let id = 1; id <= images.length; id++) {
		const result = await prisma.recipe.upsert({
			where: { id },
			update: {},
			create: {
				name: `${methods[Math.floor(Math.random() * 6)]} ${meats[Math.floor(Math.random() * 6)]} with ${sides[Math.floor(Math.random() * 6)]}`,
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
