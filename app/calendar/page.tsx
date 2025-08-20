import React from "react";
import { CalendarView } from "@/components/calendar/calendar-view";

export default function CalendarPage(): React.JSX.Element {
	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				<div className="mb-6">
					<h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
					<p className="text-gray-600 mt-2">
						View and manage your tasks, goals, and metrics on a calendar
					</p>
				</div>
				<CalendarView />
			</div>
		</div>
	);
}

