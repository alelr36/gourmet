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
