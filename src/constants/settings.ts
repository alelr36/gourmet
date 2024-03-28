export enum Themes {
	light = 'light',
	dark = 'dark',
}

export const getDefaultSettings = () => ({
	theme: Themes.light,
});
