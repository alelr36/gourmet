import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LoginLink, LogoutLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import prisma from '@/lib/db';
import { getDefaultSettings } from '@/constants/settings';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const { getUser, isAuthenticated } = getKindeServerSession();
	const isAuthenticatedUser = await isAuthenticated();
	const kindeUser = await getUser();

	const settings = isAuthenticatedUser
		? (
				await prisma.user.findUnique({
					where: {
						kindeId: kindeUser?.id,
					},
					include: {
						settings: true,
					},
				})
			)?.settings
		: getDefaultSettings();

	return (
		<html lang="en">
			<body className={cn(inter.className, settings?.theme)}>
				<div className="h-full">
					<div className="grid grid-cols-1 lg:grid-cols-12">
						<aside className="p-4 flex flex-col justify-between lg:h-screen md:sticky md:top-0 lg:col-span-2">
							<div className="flex flex-col items-center">
								<Link href="/">Home</Link>
								{isAuthenticatedUser && (
									<>
										<Link href="/user/settings">Settings</Link>
										<Link href="/admin">Admin</Link>
									</>
								)}
							</div>
							<div className="flex flex-col items-center">
								{isAuthenticatedUser ? (
									<LogoutLink>Log out</LogoutLink>
								) : (
									<LoginLink>Sign in</LoginLink>
								)}
							</div>
						</aside>
						<main className="p-4 flex flex-col items-center lg:col-span-10">
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
