"use client";

import React, { useState } from "react";
import { useData, Task } from "@/lib/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Clock, 
  Calendar,
  Plus,
  Filter,
  Search,
  MoreVertical
} from "lucide-react";
import { QuickAddForm } from "@/components/dashboard/quick-add-form";
import { TaskEditForm } from "./task-edit-form";

const priorityColors = {
  urgent: "bg-purple-500 text-white border-4 border-purple-700 shadow-lg font-bold",
  high: "bg-red-500 text-white border-4 border-red-700 shadow-lg font-bold",
  medium: "bg-orange-500 text-white border-4 border-orange-700 shadow-lg font-bold",
  low: "bg-yellow-500 text-white border-4 border-yellow-700 shadow-lg font-bold"
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800"
};

export function TasksView() {
  const { tasks, addTask, updateTask, deleteTask, updateTaskStatus, isLoading } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Loading Tasks...
          </h1>
        </div>
      </div>
    );
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getTasksByStatus = (status: string) => {
    return filteredTasks.filter(task => task.status === status);
  };

  const columns = [
    { id: "pending", title: "To Do", color: "bg-yellow-50" },
    { id: "in-progress", title: "In Progress", color: "bg-blue-50" },
    { id: "completed", title: "Completed", color: "bg-green-50" }
  ];

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
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
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <button 
                onClick={() => setShowAddTaskForm(true)} 
                className="w-full flex items-center justify-center font-semibold transition-all duration-300 rounded-md px-4 py-2 h-10"
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
                Add Task
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Task Form */}
      {showAddTaskForm && (
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
              Add New Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <QuickAddForm onClose={() => setShowAddTaskForm(false)} />
          </CardContent>
        </Card>
      )}

      {/* Edit Task Form */}
      {editingTask && (
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
              <MoreVertical className="h-5 w-5" />
              Edit Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TaskEditForm task={editingTask} onClose={() => setEditingTask(null)} />
          </CardContent>
        </Card>
      )}

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(column => (
          <Card 
            key={column.id} 
            className={`${column.color} transition-all duration-300 cursor-pointer`}
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
              <CardTitle className="flex items-center justify-between text-gray-900">
                <span>{column.title}</span>
                <Badge variant="secondary">
                  {getTasksByStatus(column.id).length}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getTasksByStatus(column.id).map(task => (
                  <Card key={task.id} className="bg-white shadow-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-sm text-black">{task.title}</h4>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="transition-all duration-200"
                          style={{
                            backgroundColor: 'transparent',
                            color: '#6b7280'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.1)';
                            e.currentTarget.style.color = '#f97316';
                            e.currentTarget.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.6)';
                            e.currentTarget.style.transform = 'scale(1.1)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#6b7280';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.transform = 'scale(1)';
                          }}
                          onClick={() => setEditingTask(task)}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      {task.description && (
                        <p className="text-xs text-black mb-3 line-clamp-2">
                          {task.description}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mb-3">
                        <div 
                          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-bold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`}
                          style={{
                            backgroundColor: 'white',
                            color: 'black',
                            border: `3px solid ${
                              task.priority === 'urgent' ? '#8b5cf6' : 
                              task.priority === 'high' ? '#ef4444' : 
                              task.priority === 'medium' ? '#f97316' : '#eab308'
                            }`,
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                          }}
                        >
                          {task.priority.toUpperCase()}
                        </div>
                        
                        {task.dueDate && (
                          <div className="flex items-center text-xs text-black">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(task.dueDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      
                      {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {task.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs text-black">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        {column.id !== "completed" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="transition-all duration-200"
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
                            onClick={() => {
                              const nextStatus = column.id === "pending" ? "in-progress" : "completed";
                              updateTaskStatus(task.id, nextStatus);
                            }}
                          >
                            {column.id === "pending" ? "Start" : "Complete"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

