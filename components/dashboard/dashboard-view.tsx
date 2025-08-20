"use client";

import React from "react";
import { useData } from "@/lib/data-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Flame
} from "lucide-react";
import { QuickAddForm } from "./quick-add-form";
import Link from "next/link";

export function DashboardView() {
  const { tasks, goals, metrics, isLoading } = useData();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Loading...
          </h1>
        </div>
      </div>
    );
  }
  
  // Calculate real data from context
  const todayTasks = tasks.filter(task => task.status === "completed").length;
  const totalTasks = tasks.length;
  const weeklyProgress = totalTasks > 0 ? Math.round((todayTasks / totalTasks) * 100) : 0;
  const monthlyProgress = Math.min(weeklyProgress + 15, 100); // Mock monthly progress
  const currentStreak = 7; // Mock streak data
  const bestStreak = 15; // Mock streak data

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          Let's make today productive and track your progress
        </p>
      </div>

      {/* Progress Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
            <CardTitle className="text-sm font-medium">Today's Tasks</CardTitle>
            <span className="text-lg">✅</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todayTasks}/{totalTasks}</div>
            <Progress value={(todayTasks / totalTasks) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {Math.round((todayTasks / totalTasks) * 100)}% completed
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
            <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
            <span className="text-lg">🎯</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{weeklyProgress}%</div>
            <Progress value={weeklyProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              On track for weekly goals
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
            <CardTitle className="text-sm font-medium">Monthly Progress</CardTitle>
            <span className="text-lg">📈</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{monthlyProgress}%</div>
            <Progress value={monthlyProgress} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              {40 - monthlyProgress}% to monthly target
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Streaks Section */}
      <Card 
        className="mb-8 transition-all duration-300 cursor-pointer"
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
            <Flame className="h-5 w-5 text-orange-500" />
            Your Streaks
          </CardTitle>
          <CardDescription>
            Keep the momentum going! Track your consistency
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">
                {currentStreak}
              </div>
              <div className="text-sm text-muted-foreground">Current Streak</div>
              <div className="text-xs text-muted-foreground mt-1">
                {currentStreak > 0 ? "🔥 Keep it up!" : "Start building your streak"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-500 mb-2">
                {bestStreak}
              </div>
              <div className="text-sm text-muted-foreground">Best Streak</div>
              <div className="text-xs text-muted-foreground mt-1">
                Your personal record
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Add Section */}
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
            <Plus className="h-5 w-5" />
            Quick Add
          </CardTitle>
          <CardDescription>
            Quickly add a task, goal, or log a metric
          </CardDescription>
        </CardHeader>
        <CardContent>
          <QuickAddForm onClose={() => {}} />
        </CardContent>
      </Card>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                             <Link href="/calendar">
          <Card 
            className="cursor-pointer transition-all duration-300"
            style={{
              boxShadow: 'none',
              transform: 'scale(1)'
            }}
            onMouseEnter={(e) => {
              const card = e.currentTarget;
              card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
              card.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              const card = e.currentTarget;
              card.style.boxShadow = 'none';
              card.style.transform = 'scale(1)';
            }}
          >
            <CardContent className="p-6">
                          <div className="flex items-center space-x-3">
              <span className="text-2xl">📅</span>
              <div>
                <h3 className="font-semibold">Calendar</h3>
                <p className="text-sm text-muted-foreground">View all activities</p>
              </div>
            </div>
            </CardContent>
          </Card>
        </Link>

                                     <Link href="/tasks">
             <Card 
               className="cursor-pointer transition-all duration-300"
               style={{
                 boxShadow: 'none',
                 transform: 'scale(1)'
               }}
               onMouseEnter={(e) => {
                 const card = e.currentTarget;
                 card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                 card.style.transform = 'scale(1.02)';
               }}
               onMouseLeave={(e) => {
                 const card = e.currentTarget;
                 card.style.boxShadow = 'none';
                 card.style.transform = 'scale(1)';
               }}
             >
            <CardContent className="p-6">
                          <div className="flex items-center space-x-3">
              <span className="text-2xl">✅</span>
              <div>
                <h3 className="font-semibold">Tasks</h3>
                <p className="text-sm text-muted-foreground">Manage your tasks</p>
              </div>
            </div>
            </CardContent>
          </Card>
        </Link>

                                     <Link href="/goals">
             <Card 
               className="cursor-pointer transition-all duration-300"
               style={{
                 boxShadow: 'none',
                 transform: 'scale(1)'
               }}
               onMouseEnter={(e) => {
                 const card = e.currentTarget;
                 card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                 card.style.transform = 'scale(1.02)';
               }}
               onMouseLeave={(e) => {
                 const card = e.currentTarget;
                 card.style.boxShadow = 'none';
                 card.style.transform = 'scale(1)';
               }}
             >
            <CardContent className="p-6">
                          <div className="flex items-center space-x-3">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="font-semibold">Goals</h3>
                <p className="text-sm text-muted-foreground">Track your goals</p>
              </div>
            </div>
            </CardContent>
          </Card>
        </Link>

                                     <Link href="/metrics">
             <Card 
               className="cursor-pointer transition-all duration-300"
               style={{
                 boxShadow: 'none',
                 transform: 'scale(1)'
               }}
               onMouseEnter={(e) => {
                 const card = e.currentTarget;
                 card.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                 card.style.transform = 'scale(1.02)';
               }}
               onMouseLeave={(e) => {
                 const card = e.currentTarget;
                 card.style.boxShadow = 'none';
                 card.style.transform = 'scale(1)';
               }}
             >
            <CardContent className="p-6">
                          <div className="flex items-center space-x-3">
              <span className="text-2xl">📊</span>
              <div>
                <h3 className="font-semibold">Metrics</h3>
                <p className="text-sm text-muted-foreground">Monitor progress</p>
              </div>
            </div>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

