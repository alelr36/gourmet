'use server';

import { revalidatePath } from 'next/cache';
import prisma from './db';
import { Themes } from '@/constants/settings';

export async function updateUserSettings(userId: number, formData: FormData) {
	const theme = formData.get('theme') as string;

	await prisma.userSettings.update({
		where: {
			userId,
		},
		data: {
			theme: theme || Themes.light,
		},
	});

	revalidatePath('/');
}

export async function deleteRecipe(formData: FormData) {
	const id = formData.get('id') as string;

	await prisma.recipe.delete({
		where: {
			id: parseInt(id),
		},
	});

	revalidatePath('/');
}
