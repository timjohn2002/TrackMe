import React from "react";
import { 
  CheckCircle, 
  Target, 
  TrendingUp, 
  Flame, 
  Plus,
  Calendar,
  BarChart3,
  FileText
} from "lucide-react";

// Mock data
const mockData = {
  tasks: { completed: 3, total: 8, percentage: 38 },
  weeklyProgress: { percentage: 75, status: "On track for weekly goals" },
  monthlyProgress: { percentage: 60, change: -20, status: "-20% to monthly target" },
  streaks: { current: 7, best: 15 }
};

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
        <p className="text-gray-600">Let's make today productive and track your progress</p>
      </div>

      {/* Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Today's Tasks</h3>
            <CheckCircle className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold mb-2">{mockData.tasks.completed}/{mockData.tasks.total}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all" 
              style={{ width: `${mockData.tasks.percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">{mockData.tasks.percentage}% completed</p>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Weekly Progress</h3>
            <Target className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold mb-2">{mockData.weeklyProgress.percentage}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all" 
              style={{ width: `${mockData.weeklyProgress.percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">{mockData.weeklyProgress.status}</p>
        </div>

        <div className="bg-white rounded-lg border shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium">Monthly Progress</h3>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold mb-2">{mockData.monthlyProgress.percentage}%</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all" 
              style={{ width: `${mockData.monthlyProgress.percentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">{mockData.monthlyProgress.status}</p>
        </div>
      </div>

      {/* Streaks Section */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <Flame className="h-5 w-5 text-orange-500" />
            Your Streaks
          </h2>
          <p className="text-sm text-gray-600">Keep the momentum going! Track your consistency</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-500 mb-2">{mockData.streaks.current}</div>
            <div className="text-sm text-gray-600">Current Streak</div>
            <div className="text-xs text-gray-500 mt-1">🔥 Keep it up!</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-500 mb-2">{mockData.streaks.best}</div>
            <div className="text-sm text-gray-600">Best Streak</div>
            <div className="text-xs text-gray-500 mt-1">Your personal record</div>
          </div>
        </div>
      </div>

      {/* Quick Add Section */}
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-8">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
            <Plus className="h-5 w-5" />
            Quick Add
          </h2>
          <p className="text-sm text-gray-600">Quickly add a task, goal, or log a metric</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 h-20 flex flex-col items-center justify-center space-y-2 rounded-md transition-colors">
            <CheckCircle className="h-6 w-6" />
            <span>Add Task</span>
          </button>
          <button className="border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 h-20 flex flex-col items-center justify-center space-y-2 rounded-md transition-colors">
            <Target className="h-6 w-6" />
            <span>Add Goal</span>
          </button>
          <button className="border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 h-20 flex flex-col items-center justify-center space-y-2 rounded-md transition-colors">
            <BarChart3 className="h-6 w-6" />
            <span>Log Metric</span>
          </button>
        </div>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border shadow-sm cursor-pointer hover:shadow-md transition-shadow p-6">
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold">Calendar</h3>
              <p className="text-sm text-gray-600">View all activities</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm cursor-pointer hover:shadow-md transition-shadow p-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold">Tasks</h3>
              <p className="text-sm text-gray-600">Manage your tasks</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm cursor-pointer hover:shadow-md transition-shadow p-6">
          <div className="flex items-center space-x-3">
            <Target className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold">Goals</h3>
              <p className="text-sm text-gray-600">Track your goals</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border shadow-sm cursor-pointer hover:shadow-md transition-shadow p-6">
          <div className="flex items-center space-x-3">
            <BarChart3 className="h-8 w-8 text-orange-500" />
            <div>
              <h3 className="font-semibold">Metrics</h3>
              <p className="text-sm text-gray-600">Monitor progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
