import { WhopApp } from "@whop/react/components";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TopBanner } from "@/components/top-banner";
import { Navigation } from "@/components/navigation";
import { DataProvider } from "@/lib/data-context";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
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
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}
			>
				<WhopApp>
					<DataProvider>
						<TopBanner key="top-banner" />
						<Navigation key="navigation" />
						{children}
					</DataProvider>
				</WhopApp>
			</body>
		</html>
	);
}
