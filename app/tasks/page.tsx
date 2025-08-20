import React from "react";
import { TasksView } from "@/components/tasks/tasks-view";

export default function TasksPage(): React.JSX.Element {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
					<p className="text-gray-600 mt-2">
						Manage your tasks with Kanban board and filters
					</p>
				</div>
				<TasksView />
			</div>
		</div>
	);
}

