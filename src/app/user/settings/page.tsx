import { Themes } from '@/constants/settings';
import { updateUserSettings } from '@/lib/actions';
import prisma from '@/lib/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';

export default async function UserSettingsPage() {
	const { getUser } = getKindeServerSession();

	const kindeUser = await getUser();

	if (!kindeUser) {
		redirect('/api/auth/login');
	}

	const user = await prisma.user.findUnique({
		where: {
			kindeId: kindeUser.id,
		},
		include: {
			settings: true,
		},
	});

	if (!user?.settings) {
		return null;
	}

	const updateUserSettingsWithId = updateUserSettings.bind(
		null,
		user.settings.id,
	);

	const themes = Object.values(Themes).map((value) => value);

	return (
		<div>
			<form action={updateUserSettingsWithId}>
				<select className="text-black" required id="theme" name="theme">
					{themes.map((theme) => (
						<option
							key={theme}
							value={theme}
							selected={user.settings?.theme === theme}
						>
							{theme}
						</option>
					))}
				</select>
				<input type="submit" value="Save" />
			</form>
		</div>
	);
}
