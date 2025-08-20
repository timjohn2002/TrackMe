import React from "react";
import { ReportsView } from "@/components/reports/reports-view";

export default function ReportsPage(): React.JSX.Element {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900">Reports</h1>
					<p className="text-gray-600 mt-2">
						Generate comprehensive reports and export your data
					</p>
				</div>
				<ReportsView />
			</div>
		</div>
	);
}

