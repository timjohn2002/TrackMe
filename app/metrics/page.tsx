import React from "react";
import { MetricsView } from "@/components/metrics/metrics-view";

export default function MetricsPage(): React.JSX.Element {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900">Metrics</h1>
					<p className="text-gray-600 mt-2">
						Track custom numeric metrics with detailed analytics and trends
					</p>
				</div>
				<MetricsView />
			</div>
		</div>
	);
}

