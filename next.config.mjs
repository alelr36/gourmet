/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.insidetherustickitchen.com',
				port: '',
				pathname: '/wp-content/**',
			},
		],
	},
};

export default nextConfig;
