"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Calendar,
  BarChart3,
  Target,
  CheckCircle,
  TrendingUp,
  FileText
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

type Period = "this-week" | "this-month" | "last-90-days" | "custom";

export function ReportsView() {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("this-month");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  // Mock data - in real app this would come from API based on selected period
  const mockData = {
    tasks: {
      total: 45,
      completed: 32,
      pending: 8,
      inProgress: 5,
      completionRate: 71
    },
    goals: {
      total: 8,
      completed: 3,
      inProgress: 4,
      overdue: 1,
      completionRate: 37.5
    },
    metrics: {
      totalLogs: 156,
      averageValue: 42.5,
      trend: "up",
      topMetric: "Sales Calls"
    },
    trends: [
      { date: "Jan 1", tasks: 5, goals: 2, metrics: 12 },
      { date: "Jan 8", tasks: 8, goals: 3, metrics: 18 },
      { date: "Jan 15", tasks: 12, goals: 5, metrics: 25 },
      { date: "Jan 22", tasks: 15, goals: 6, metrics: 30 },
      { date: "Jan 29", tasks: 18, goals: 7, metrics: 35 }
    ],
    taskStatus: [
      { name: "Completed", value: 32, color: "#10b981" },
      { name: "In Progress", value: 5, color: "#3b82f6" },
      { name: "Pending", value: 8, color: "#f59e0b" }
    ],
    topTasks: [
      { title: "Complete project proposal", status: "completed", priority: "high" },
      { title: "Review team performance", status: "in-progress", priority: "medium" },
      { title: "Update website content", status: "completed", priority: "low" },
      { title: "Client meeting preparation", status: "pending", priority: "high" },
      { title: "Data analysis report", status: "pending", priority: "medium" }
    ]
  };

  const getPeriodLabel = (period: Period) => {
    switch (period) {
      case "this-week": return "This Week";
      case "this-month": return "This Month";
      case "last-90-days": return "Last 90 Days";
      case "custom": return "Custom Period";
      default: return "This Month";
    }
  };

  const exportCSV = (type: "tasks" | "goals" | "metrics") => {
    // Mock CSV export - in real app this would generate actual CSV data
    const csvData = `Date,${type},Status,Value\n2024-01-15,Sample ${type},Active,100\n2024-01-16,Sample ${type} 2,Completed,150`;
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}-report-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Period Selection */}
      <Card
        className="transition-all duration-300 cursor-pointer"
        style={{
          boxShadow: 'none',
          transform: 'scale(1)'
        }}
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
          card.style.transform = 'scale(1.02)';
          card.style.zIndex = '10';
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.boxShadow = 'none';
          card.style.transform = 'scale(1)';
          card.style.zIndex = 'auto';
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Report Period
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button
              onClick={() => setSelectedPeriod("this-week")}
              className="h-10 px-4 py-2 font-medium transition-all duration-300 rounded-md"
              style={{
                backgroundColor: selectedPeriod === "this-week" ? 'rgb(234 88 12)' : 'white',
                color: selectedPeriod === "this-week" ? 'white' : 'rgb(234 88 12)',
                borderColor: 'rgb(234 88 12)',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
              onMouseEnter={(e) => {
                if (selectedPeriod !== "this-week") {
                  e.currentTarget.style.backgroundColor = 'rgb(234 88 12)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPeriod !== "this-week") {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'rgb(234 88 12)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              This Week
            </button>
            <button
              onClick={() => setSelectedPeriod("this-month")}
              className="h-10 px-4 py-2 font-medium transition-all duration-300 rounded-md"
              style={{
                backgroundColor: selectedPeriod === "this-month" ? 'rgb(234 88 12)' : 'white',
                color: selectedPeriod === "this-month" ? 'white' : 'rgb(234 88 12)',
                borderColor: 'rgb(234 88 12)',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
              onMouseEnter={(e) => {
                if (selectedPeriod !== "this-month") {
                  e.currentTarget.style.backgroundColor = 'rgb(234 88 12)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPeriod !== "this-month") {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'rgb(234 88 12)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              This Month
            </button>
            <button
              onClick={() => setSelectedPeriod("last-90-days")}
              className="h-10 px-4 py-2 font-medium transition-all duration-300 rounded-md"
              style={{
                backgroundColor: selectedPeriod === "last-90-days" ? 'rgb(234 88 12)' : 'white',
                color: selectedPeriod === "last-90-days" ? 'white' : 'rgb(234 88 12)',
                borderColor: 'rgb(234 88 12)',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
              onMouseEnter={(e) => {
                if (selectedPeriod !== "last-90-days") {
                  e.currentTarget.style.backgroundColor = 'rgb(234 88 12)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPeriod !== "last-90-days") {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'rgb(234 88 12)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              Last 90 Days
            </button>
            <button
              onClick={() => setSelectedPeriod("custom")}
              className="h-10 px-4 py-2 font-medium transition-all duration-300 rounded-md"
              style={{
                backgroundColor: selectedPeriod === "custom" ? 'rgb(234 88 12)' : 'white',
                color: selectedPeriod === "custom" ? 'white' : 'rgb(234 88 12)',
                borderColor: 'rgb(234 88 12)',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
              onMouseEnter={(e) => {
                if (selectedPeriod !== "custom") {
                  e.currentTarget.style.backgroundColor = 'rgb(234 88 12)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedPeriod !== "custom") {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'rgb(234 88 12)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              Custom
            </button>
          </div>

          {selectedPeriod === "custom" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <input
                  type="date"
                  value={customStartDate}
                  onChange={(e) => setCustomStartDate(e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <input
                  type="date"
                  value={customEndDate}
                  onChange={(e) => setCustomEndDate(e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card
          className="transition-all duration-300 cursor-pointer"
          style={{
            boxShadow: 'none',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
            card.style.transform = 'scale(1.02)';
            card.style.zIndex = '10';
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = 'none';
            card.style.transform = 'scale(1)';
            card.style.zIndex = 'auto';
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.tasks.total}</div>
            <p className="text-xs text-muted-foreground">
              {mockData.tasks.completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card
          className="transition-all duration-300 cursor-pointer"
          style={{
            boxShadow: 'none',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
            card.style.transform = 'scale(1.02)';
            card.style.zIndex = '10';
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = 'none';
            card.style.transform = 'scale(1)';
            card.style.zIndex = 'auto';
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.goals.total}</div>
            <p className="text-xs text-muted-foreground">
              {mockData.goals.completionRate}% completion rate
            </p>
          </CardContent>
        </Card>

        <Card
          className="transition-all duration-300 cursor-pointer"
          style={{
            boxShadow: 'none',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
            card.style.transform = 'scale(1.02)';
            card.style.zIndex = '10';
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = 'none';
            card.style.transform = 'scale(1)';
            card.style.zIndex = 'auto';
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Metrics</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.metrics.totalLogs}</div>
            <p className="text-xs text-muted-foreground">
              {mockData.metrics.averageValue} avg value
            </p>
          </CardContent>
        </Card>

        <Card
          className="transition-all duration-300 cursor-pointer"
          style={{
            boxShadow: 'none',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
            card.style.transform = 'scale(1.02)';
            card.style.zIndex = '10';
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = 'none';
            card.style.transform = 'scale(1)';
            card.style.zIndex = 'auto';
          }}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trend</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+12%</div>
            <p className="text-xs text-muted-foreground">
              vs last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Trends */}
        <Card
          className="transition-all duration-300 cursor-pointer"
          style={{
            boxShadow: 'none',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
            card.style.transform = 'scale(1.02)';
            card.style.zIndex = '10';
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = 'none';
            card.style.transform = 'scale(1)';
            card.style.zIndex = 'auto';
          }}
        >
          <CardHeader>
            <CardTitle>Activity Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockData.trends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2} />
                  <Line type="monotone" dataKey="goals" stroke="#8b5cf6" strokeWidth={2} />
                  <Line type="monotone" dataKey="metrics" stroke="#f59e0b" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Task Status Distribution */}
        <Card
          className="transition-all duration-300 cursor-pointer"
          style={{
            boxShadow: 'none',
            transform: 'scale(1)'
          }}
          onMouseEnter={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
            card.style.transform = 'scale(1.02)';
            card.style.zIndex = '10';
          }}
          onMouseLeave={(e) => {
            const card = e.currentTarget;
            card.style.boxShadow = 'none';
            card.style.transform = 'scale(1)';
            card.style.zIndex = 'auto';
          }}
        >
          <CardHeader>
            <CardTitle>Task Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockData.taskStatus}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {mockData.taskStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Tasks */}
      <Card
        className="transition-all duration-300 cursor-pointer"
        style={{
          boxShadow: 'none',
          transform: 'scale(1)'
        }}
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
          card.style.transform = 'scale(1.02)';
          card.style.zIndex = '10';
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.boxShadow = 'none';
          card.style.transform = 'scale(1)';
          card.style.zIndex = 'auto';
        }}
      >
        <CardHeader>
          <CardTitle>Top Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockData.topTasks.map((task, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                  <div>
                    <div className="font-medium">{task.title}</div>
                    <div className="text-sm text-gray-600">
                      Priority: {task.priority} • Status: {task.status}
                    </div>
                  </div>
                </div>
                <Badge variant={task.status === "completed" ? "default" : "secondary"}>
                  {task.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Section */}
      <Card
        className="transition-all duration-300 cursor-pointer"
        style={{
          boxShadow: 'none',
          transform: 'scale(1)'
        }}
        onMouseEnter={(e) => {
          const card = e.currentTarget;
          card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
          card.style.transform = 'scale(1.02)';
          card.style.zIndex = '10';
        }}
        onMouseLeave={(e) => {
          const card = e.currentTarget;
          card.style.boxShadow = 'none';
          card.style.transform = 'scale(1)';
          card.style.zIndex = 'auto';
        }}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => exportCSV("tasks")}
              className="flex items-center gap-2 h-10 px-4 py-2 font-medium transition-all duration-300 rounded-md"
              style={{
                backgroundColor: 'white',
                color: 'rgb(234 88 12)',
                borderColor: 'rgb(234 88 12)',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(234 88 12)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'rgb(234 88 12)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FileText className="h-4 w-4" />
              Export Tasks
            </button>
            <button
              onClick={() => exportCSV("goals")}
              className="flex items-center gap-2 h-10 px-4 py-2 font-medium transition-all duration-300 rounded-md"
              style={{
                backgroundColor: 'white',
                color: 'rgb(234 88 12)',
                borderColor: 'rgb(234 88 12)',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(234 88 12)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'rgb(234 88 12)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FileText className="h-4 w-4" />
              Export Goals
            </button>
            <button
              onClick={() => exportCSV("metrics")}
              className="flex items-center gap-2 h-10 px-4 py-2 font-medium transition-all duration-300 rounded-md"
              style={{
                backgroundColor: 'white',
                color: 'rgb(234 88 12)',
                borderColor: 'rgb(234 88 12)',
                borderWidth: '2px',
                borderStyle: 'solid'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgb(234 88 12)';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.color = 'rgb(234 88 12)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FileText className="h-4 w-4" />
              Export Metrics
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

