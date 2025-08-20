"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Target, 
  BarChart3, 
  Plus,
  X
} from "lucide-react";
import { useData } from "@/lib/data-context";

type FormType = "task" | "goal" | "metric";

interface QuickAddFormProps {
  onClose?: () => void;
}

export function QuickAddForm({ onClose }: QuickAddFormProps) {
  const { addTask, addGoal, addMetric, addMetricLog, metrics } = useData();
  const [activeForm, setActiveForm] = useState<FormType | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    value: "",
    tags: [] as string[],
    newTag: "",
    priority: "medium",
    target: "",
    unit: "",
    cadence: "monthly" as "daily" | "weekly" | "monthly",
    selectedMetric: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (activeForm === "task") {
      addTask({
        title: formData.title,
        description: formData.description,
        status: "pending",
        priority: formData.priority,
        tags: formData.tags
      });
    } else if (activeForm === "goal") {
      addGoal({
        title: formData.title,
        description: formData.description,
        target: parseFloat(formData.target) || 0,
        unit: formData.unit,
        cadence: formData.cadence,
        startDate: new Date().toISOString().split('T')[0]
      });
    } else if (activeForm === "metric") {
      if (formData.selectedMetric) {
        // Add a log to existing metric
        addMetricLog({
          metricId: formData.selectedMetric,
          value: parseFloat(formData.value) || 0,
          date: new Date().toISOString().split('T')[0],
          notes: formData.description
        });
      } else {
        // Create new metric
        addMetric({
          name: formData.title,
          description: formData.description,
          unit: formData.unit,
          color: "#3b82f6"
        });
      }
    }
    
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      value: "",
      tags: [],
      newTag: "",
      priority: "medium",
      target: "",
      unit: "",
      cadence: "monthly",
      selectedMetric: ""
    });
    setActiveForm(null);
    
    // Call onClose if provided (for tasks view)
    if (onClose) {
      onClose();
    }
  };

  const handleClose = () => {
    setActiveForm(null);
    if (onClose) {
      onClose();
    }
  };

  const addTag = () => {
    if (formData.newTag.trim() && !formData.tags.includes(formData.newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.newTag.trim()],
        newTag: ""
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  if (!activeForm) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all duration-200"
            onClick={() => setActiveForm("task")}
          >
            <CheckCircle className="h-6 w-6" />
            <span>Add Task</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all duration-200"
            onClick={() => setActiveForm("goal")}
          >
            <Target className="h-6 w-6" />
            <span>Add Goal</span>
          </Button>
          
          <Button
            variant="outline"
            className="h-20 flex flex-col items-center justify-center space-y-2 hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all duration-200"
            onClick={() => setActiveForm("metric")}
          >
            <BarChart3 className="h-6 w-6" />
            <span>Log Metric</span>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
          ✅ Successfully created! Check the respective section to see your new item.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {activeForm === "task" && "Add New Task"}
          {activeForm === "goal" && "Add New Goal"}
          {activeForm === "metric" && "Log Metric"}
        </h3>
        <button
          type="button"
          onClick={handleClose}
          className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-all duration-200"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.backgroundColor = '#dc2626';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(220, 38, 38, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#9ca3af';
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="title">
            {activeForm === "task" && "Task Title"}
            {activeForm === "goal" && "Goal Title"}
            {activeForm === "metric" && "Metric Name"}
          </Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder={
              activeForm === "task" ? "Enter task title..."
              : activeForm === "goal" ? "Enter goal title..."
              : "Enter metric name..."
            }
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter description..."
          />
        </div>

        {activeForm === "task" && (
          <div>
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        )}

        {activeForm === "goal" && (
          <>
            <div>
              <Label htmlFor="target">Target Value</Label>
              <Input
                id="target"
                type="number"
                value={formData.target}
                onChange={(e) => setFormData(prev => ({ ...prev, target: e.target.value }))}
                placeholder="Enter target value..."
                required
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                value={formData.unit}
                onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                placeholder="e.g., dollars, calls, days..."
                required
              />
            </div>
            <div>
              <Label htmlFor="cadence">Cadence</Label>
              <select
                id="cadence"
                value={formData.cadence}
                onChange={(e) => setFormData(prev => ({ ...prev, cadence: e.target.value as "daily" | "weekly" | "monthly" }))}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </>
        )}

        {activeForm === "metric" && (
          <>
            {metrics.length > 0 && (
              <div>
                <Label htmlFor="selectedMetric">Select Existing Metric (or leave empty to create new)</Label>
                <select
                  id="selectedMetric"
                  value={formData.selectedMetric}
                  onChange={(e) => setFormData(prev => ({ ...prev, selectedMetric: e.target.value }))}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Create New Metric</option>
                  {metrics.map(metric => (
                    <option key={metric.id} value={metric.id}>{metric.name}</option>
                  ))}
                </select>
              </div>
            )}
            {!formData.selectedMetric && (
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={formData.unit}
                  onChange={(e) => setFormData(prev => ({ ...prev, unit: e.target.value }))}
                  placeholder="e.g., calls, dollars, minutes..."
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                value={formData.value}
                onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Enter numeric value..."
                required
              />
            </div>
          </>
        )}

        <div>
          <Label htmlFor="tags">Tags</Label>
          <div className="flex gap-2 mb-2">
            <Input
              id="tags"
              value={formData.newTag}
              onChange={(e) => setFormData(prev => ({ ...prev, newTag: e.target.value }))}
              onKeyPress={handleKeyPress}
              placeholder="Add tags..."
            />
            <Button type="button" onClick={addTag} size="sm" className="hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all duration-200">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          {formData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-4 py-2 border-2 border-orange-500 text-orange-500 bg-white rounded-md font-medium transition-all duration-200"
          style={{
            boxShadow: 'none',
            color: '#f97316'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#f97316';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(249, 115, 22, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.color = '#f97316';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {activeForm === "task" && "Create Task"}
          {activeForm === "goal" && "Create Goal"}
          {activeForm === "metric" && "Log Metric"}
        </button>
        <button
          type="button"
          onClick={handleClose}
          className="px-4 py-2 border-2 border-orange-500 text-orange-500 bg-white rounded-md font-medium transition-all duration-200"
          style={{
            boxShadow: 'none',
            color: '#f97316'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#ef4444';
            e.currentTarget.style.borderColor = '#ef4444';
            e.currentTarget.style.color = 'white';
            e.currentTarget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'white';
            e.currentTarget.style.borderColor = '#f97316';
            e.currentTarget.style.color = '#f97316';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Cancel
        </button>
      </div>
      </form>
    </div>
  );
}

