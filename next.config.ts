import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		remotePatterns: [{ hostname: "**" }],
	},
};

export default nextConfig;
