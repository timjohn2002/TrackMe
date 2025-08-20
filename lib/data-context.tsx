"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate?: string;
  tags: string[];
  createdAt: string;
}

export interface Goal {
  id: string;
  title: string;
  description?: string;
  target: number;
  current: number;
  unit: string;
  cadence: "daily" | "weekly" | "monthly";
  startDate: string;
  endDate?: string;
  completedAt?: string;
  createdAt: string;
}

export interface Metric {
  id: string;
  name: string;
  description?: string;
  unit: string;
  color: string;
  createdAt: string;
}

export interface MetricLog {
  id: string;
  metricId: string;
  value: number;
  date: string;
  notes?: string;
}

interface DataContextType {
  // Loading state
  isLoading: boolean;
  
  // Tasks
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt">) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  updateTaskStatus: (taskId: string, newStatus: string) => void;
  
  // Goals
  goals: Goal[];
  addGoal: (goal: Omit<Goal, "id" | "createdAt" | "current">) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  deleteGoal: (goalId: string) => void;
  
  // Metrics
  metrics: Metric[];
  metricLogs: MetricLog[];
  addMetric: (metric: Omit<Metric, "id" | "createdAt">) => void;
  addMetricLog: (log: Omit<MetricLog, "id">) => void;
  updateMetric: (metricId: string, updates: Partial<Metric>) => void;
  deleteMetric: (metricId: string) => void;
  deleteMetricLog: (logId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  // Initialize state with localStorage or default values
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Handle SSR by loading data after component mounts
  useEffect(() => {
    setIsClient(true);
    
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const savedTasks = localStorage.getItem('trackme-tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks([
          {
            id: "1",
            title: "Complete project proposal",
            description: "Finish the Q1 project proposal document",
            status: "pending",
            priority: "high",
            dueDate: "2025-01-15",
            tags: ["work", "documentation"],
            createdAt: "2025-01-15"
          },
          {
            id: "2",
            title: "Review team performance",
            description: "Analyze team metrics and prepare report",
            status: "in-progress",
            priority: "medium",
            dueDate: "2025-01-16",
            tags: ["work", "analysis"],
            createdAt: "2025-01-14"
          },
          {
            id: "3",
            title: "Update website content",
            description: "Refresh homepage and about page content",
            status: "completed",
            priority: "low",
            dueDate: "2025-01-17",
            tags: ["work", "content"],
            createdAt: "2025-01-13"
          },
          {
            id: "4",
            title: "Prepare quarterly review",
            description: "Compile data and insights for Q4 review",
            status: "pending",
            priority: "urgent",
            dueDate: "2025-01-18",
            tags: ["work", "review"],
            createdAt: "2025-01-12"
          }
        ]);
      }
    }
  }, []);

  const [goals, setGoals] = useState<Goal[]>([]);

  // Handle SSR by loading goals data after component mounts
  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const savedGoals = localStorage.getItem('trackme-goals');
      if (savedGoals) {
        setGoals(JSON.parse(savedGoals));
      } else {
        setGoals([
          {
            id: "1",
            title: "Increase monthly sales",
            description: "Achieve $50k in monthly sales revenue",
            target: 50000,
            current: 35000,
            unit: "dollars",
            cadence: "monthly",
            startDate: "2025-01-01",
            endDate: "2025-12-31",
            createdAt: "2025-01-01"
          },
          {
            id: "2",
            title: "Complete 100 sales calls",
            description: "Make 100 outbound sales calls this month",
            target: 100,
            current: 75,
            unit: "calls",
            cadence: "monthly",
            startDate: "2025-01-01",
            endDate: "2025-01-31",
            createdAt: "2025-01-01"
          },
          {
            id: "3",
            title: "Exercise 5 days per week",
            description: "Maintain consistent workout routine",
            target: 5,
            current: 3,
            unit: "days",
            cadence: "weekly",
            startDate: "2025-01-01",
            createdAt: "2025-01-01"
          }
        ]);
      }
    }
  }, []);

  const [metrics, setMetrics] = useState<Metric[]>([]);

  // Handle SSR by loading metrics data after component mounts
  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const savedMetrics = localStorage.getItem('trackme-metrics');
      if (savedMetrics) {
        setMetrics(JSON.parse(savedMetrics));
      } else {
        setMetrics([
          {
            id: "1",
            name: "Sales Calls",
            description: "Number of sales calls made",
            unit: "calls",
            color: "#3b82f6",
            createdAt: "2024-01-01"
          },
          {
            id: "2",
            name: "Revenue",
            description: "Daily revenue generated",
            unit: "dollars",
            color: "#10b981",
            createdAt: "2024-01-01"
          },
          {
            id: "3",
            name: "Workout Minutes",
            description: "Minutes spent exercising",
            unit: "minutes",
            color: "#f59e0b",
            createdAt: "2024-01-01"
          }
        ]);
      }
    }
  }, []);

  const [metricLogs, setMetricLogs] = useState<MetricLog[]>([]);

  // Handle SSR by loading metric logs data after component mounts
  useEffect(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const savedMetricLogs = localStorage.getItem('trackme-metric-logs');
      if (savedMetricLogs) {
        setMetricLogs(JSON.parse(savedMetricLogs));
      } else {
        setMetricLogs([
          { id: "1", metricId: "1", value: 15, date: "2024-01-15", notes: "Morning calls" },
          { id: "2", metricId: "1", value: 12, date: "2024-01-16", notes: "Afternoon calls" },
          { id: "3", metricId: "2", value: 2500, date: "2024-01-15", notes: "Product sales" },
          { id: "4", metricId: "2", value: 3200, date: "2024-01-16", notes: "Service sales" },
          { id: "5", metricId: "3", value: 45, date: "2024-01-15", notes: "Cardio session" },
          { id: "6", metricId: "3", value: 30, date: "2024-01-16", notes: "Strength training" }
        ]);
      }
    }
  }, []);

  // Save to localStorage whenever data changes (only on client)
  useEffect(() => {
    if (isClient) {
      localStorage.setItem('trackme-tasks', JSON.stringify(tasks));
    }
  }, [tasks, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('trackme-goals', JSON.stringify(goals));
    }
  }, [goals, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('trackme-metrics', JSON.stringify(metrics));
    }
  }, [metrics, isClient]);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('trackme-metric-logs', JSON.stringify(metricLogs));
    }
  }, [metricLogs, isClient]);

  // Task functions
  const addTask = (taskData: Omit<Task, "id" | "createdAt">) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  const updateTaskStatus = (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  // Goal functions
  const addGoal = (goalData: Omit<Goal, "id" | "createdAt" | "current">) => {
    const newGoal: Goal = {
      ...goalData,
      id: Date.now().toString(),
      current: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const updateGoal = (goalId: string, updates: Partial<Goal>) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  // Metric functions
  const addMetric = (metricData: Omit<Metric, "id" | "createdAt">) => {
    const newMetric: Metric = {
      ...metricData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setMetrics(prev => [...prev, newMetric]);
  };

  const addMetricLog = (logData: Omit<MetricLog, "id">) => {
    const newLog: MetricLog = {
      ...logData,
      id: Date.now().toString()
    };
    setMetricLogs(prev => [...prev, newLog]);
  };

  const updateMetric = (metricId: string, updates: Partial<Metric>) => {
    setMetrics(prev => prev.map(metric => 
      metric.id === metricId ? { ...metric, ...updates } : metric
    ));
  };

  const deleteMetric = (metricId: string) => {
    setMetrics(prev => prev.filter(metric => metric.id !== metricId));
    // Also delete related logs
    setMetricLogs(prev => prev.filter(log => log.metricId !== metricId));
  };

  const deleteMetricLog = (logId: string) => {
    setMetricLogs(prev => prev.filter(log => log.id !== logId));
  };

  const value: DataContextType = {
    isLoading: false, // Disable loading state for now to ensure app works
    tasks,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    metrics,
    metricLogs,
    addMetric,
    addMetricLog,
    updateMetric,
    deleteMetric,
    deleteMetricLog
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
