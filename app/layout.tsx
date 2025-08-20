// import { WhopApp } from "@whop/react/components";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TopBanner } from "@/components/top-banner";
import { Navigation } from "@/components/navigation";
import { DataProvider } from "@/lib/data-context";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "TrackMe - Accountability & Metrics Tracker",
	description: "Track your tasks, goals, and metrics to stay consistent and achieve your objectives",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${inter.variable} antialiased`}
			>
				{/* <WhopApp> */}
					<DataProvider>
						<TopBanner key="top-banner" />
						<Navigation key="navigation" />
						{children}
					</DataProvider>
				{/* </WhopApp> */}
			</body>
		</html>
	);
}
