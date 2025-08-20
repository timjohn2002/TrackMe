"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Plus,
  X,
  Calendar
} from "lucide-react";
import { useData, Task } from "@/lib/data-context";

interface TaskEditFormProps {
  task: Task;
  onClose: () => void;
}

export function TaskEditForm({ task, onClose }: TaskEditFormProps) {
  const { updateTask } = useData();
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    priority: task.priority,
    dueDate: task.dueDate || "",
    tags: [...task.tags],
    newTag: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateTask(task.id, {
      ...task,
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dueDate: formData.dueDate || undefined,
      tags: formData.tags
    });
    
    onClose();
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

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Edit Task</h3>
          <button
            type="button"
            onClick={onClose}
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
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter task title..."
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

          <div>
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              value={formData.priority}
              onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <Label htmlFor="dueDate">Due Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="pl-10"
              />
            </div>
          </div>

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
            Update Task
          </button>
          <button
            type="button"
            onClick={onClose}
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
