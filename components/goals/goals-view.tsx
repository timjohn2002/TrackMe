"use client";

import React, { useState } from "react";
import { useData } from "@/lib/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Target, 
  Plus, 
  Calendar,
  TrendingUp,
  Clock,
  CheckCircle,
  Edit,
  Trash2
} from "lucide-react";

interface Goal {
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

export function GoalsView() {
  const { goals, addGoal, updateGoal, deleteGoal, isLoading } = useData();

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Loading Goals...
          </h1>
        </div>
      </div>
    );
  }

  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    target: "",
    unit: "",
    cadence: "monthly" as Goal["cadence"],
    endDate: ""
  });

  const calculateProgress = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const calculateETA = (goal: Goal) => {
    if (goal.current >= goal.target) return "Completed!";
    
    const progress = goal.current / goal.target;
    const daysElapsed = Math.floor((Date.now() - new Date(goal.startDate).getTime()) / (1000 * 60 * 60 * 24));
    const totalDaysNeeded = daysElapsed / progress;
    const daysRemaining = Math.ceil(totalDaysNeeded - daysElapsed);
    
    if (daysRemaining <= 0) return "Overdue";
    if (daysRemaining === 1) return "1 day";
    if (daysRemaining < 7) return `${daysRemaining} days`;
    if (daysRemaining < 30) return `${Math.ceil(daysRemaining / 7)} weeks`;
    return `${Math.ceil(daysRemaining / 30)} months`;
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    addGoal({
      title: newGoal.title,
      description: newGoal.description,
      target: parseFloat(newGoal.target) || 0,
      unit: newGoal.unit,
      cadence: newGoal.cadence,
      startDate: new Date().toISOString().split('T')[0],
      endDate: newGoal.endDate || undefined
    });
    setNewGoal({
      title: "",
      description: "",
      target: "",
      unit: "",
      cadence: "monthly",
      endDate: ""
    });
    setShowAddForm(false);
  };

  const updateProgress = (goalId: string, newCurrent: number) => {
    updateGoal(goalId, { current: newCurrent });
  };

  const handleDeleteGoal = (goalId: string) => {
    if (confirm("Are you sure you want to delete this goal?")) {
      deleteGoal(goalId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Add Goal Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Goals</h2>
        <button 
          onClick={() => setShowAddForm(true)} 
          className="flex items-center justify-center font-semibold transition-all duration-300 rounded-md px-4 py-2 h-10"
          style={{
            backgroundColor: 'white',
            borderColor: 'rgb(234 88 12)',
            color: 'rgb(234 88 12)',
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
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </button>
      </div>

      {/* Add Goal Form */}
      {showAddForm && (
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
            <CardTitle>Add New Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGoal} className="space-y-4">
              <div>
                <Label htmlFor="title">Goal Title</Label>
                <Input
                  id="title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., Increase monthly sales"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your goal..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="target">Target</Label>
                  <Input
                    id="target"
                    type="number"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, target: e.target.value }))}
                    placeholder="100"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={newGoal.unit}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, unit: e.target.value }))}
                    placeholder="e.g., calls, dollars, days"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="cadence">Cadence</Label>
                  <select
                    id="cadence"
                    value={newGoal.cadence}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, cadence: e.target.value as Goal["cadence"] }))}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="endDate">End Date (Optional)</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={newGoal.endDate}
                  onChange={(e) => setNewGoal(prev => ({ ...prev, endDate: e.target.value }))}
                />
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="hover:bg-orange-600 hover:border-orange-600 transition-all duration-200">Create Goal</Button>
                <Button type="button" variant="outline" className="hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all duration-200" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map(goal => {
          const progress = calculateProgress(goal);
          const eta = calculateETA(goal);
          const isCompleted = goal.current >= goal.target;
          
          return (
            <Card 
              key={goal.id} 
              className={`${isCompleted ? "border-green-200 bg-green-50" : ""} transition-all duration-300 cursor-pointer`}
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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{goal.title}</CardTitle>
                    {goal.description && (
                      <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="delete-goal-btn inline-flex items-center justify-center h-9 rounded-md px-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    style={{
                      backgroundColor: 'transparent',
                      color: 'currentColor'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#fef2f2';
                      e.currentTarget.style.color = '#dc2626';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'currentColor';
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant={isCompleted ? "default" : "secondary"}>
                      {Math.round(progress)}%
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {eta}
                    </div>
                  </div>
                </div>
                
                {/* Goal Details */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Cadence:</span>
                    <Badge variant="outline" className="capitalize">
                      {goal.cadence}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Started:</span>
                    <span>{new Date(goal.startDate).toLocaleDateString()}</span>
                  </div>
                  
                  {goal.endDate && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Target Date:</span>
                      <span>{new Date(goal.endDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                
                {/* Update Progress */}
                {!isCompleted && (
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Update progress"
                      className="flex-1"
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          const input = e.target as HTMLInputElement;
                          const newValue = parseFloat(input.value);
                          if (!isNaN(newValue)) {
                            updateProgress(goal.id, newValue);
                            input.value = "";
                          }
                        }
                      }}
                    />
                    <Button
                      size="sm"
                      onClick={() => {
                        const newValue = goal.current + 1;
                        updateProgress(goal.id, newValue);
                      }}
                    >
                      +1
                    </Button>
                  </div>
                )}
                
                {isCompleted && (
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm font-medium">Goal Completed!</span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

