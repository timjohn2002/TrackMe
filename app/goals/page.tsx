import React from "react";
import { GoalsView } from "@/components/goals/goals-view";

export default function GoalsPage(): React.JSX.Element {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900">Goals</h1>
					<p className="text-gray-600 mt-2">
						Set and track your SMART goals with automatic progress calculation
					</p>
				</div>
				<GoalsView />
			</div>
		</div>
	);
}

