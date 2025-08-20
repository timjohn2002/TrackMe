"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, List, Grid, Clock, Plus, X } from "lucide-react";
import { useData } from "@/lib/data-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ViewType = "month" | "week" | "day";

interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  type: "task" | "goal" | "metric";
  status?: string;
  color?: string;
  description?: string;
  priority?: string;
}

export function CalendarView() {
  const [view, setView] = useState<ViewType>("month");
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showDateEventsModal, setShowDateEventsModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [dateEvents, setDateEvents] = useState<CalendarEvent[]>([]);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editingDescription, setEditingDescription] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');
  const [isEditingType, setIsEditingType] = useState(false);
  const [isEditingPriority, setIsEditingPriority] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "task" as "task" | "goal",
    priority: "medium" as "low" | "medium" | "high" | "urgent",
    target: "",
    unit: "",
    cadence: "monthly" as "daily" | "weekly" | "monthly"
  });
  
  const { addTask, addGoal, tasks, goals, isLoading } = useData();

  // Load events from tasks and goals
  useEffect(() => {
    if (isLoading) return;
    
    const calendarEvents: CalendarEvent[] = [];
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    
    // Add tasks to calendar - only if they have a due date, it's not in the past, and they're not completed
    tasks.forEach(task => {
      if (task.dueDate && task.dueDate >= today && task.status !== "completed") {
        const startDate = new Date(task.dueDate);
        const endDate = new Date(task.dueDate);
        endDate.setHours(23, 59, 59);
        
        calendarEvents.push({
          id: `task-${task.id}`,
          title: task.title,
          start: startDate,
          end: endDate,
          type: "task",
          status: task.status,
          color: task.priority === "urgent" ? "#ef4444" : 
                 task.priority === "high" ? "#f97316" : 
                 task.priority === "medium" ? "#3b82f6" : "#eab308",
          description: task.description,
          priority: task.priority
        });
      }
    });
    
    // Add goals to calendar - only if they have a start date, it's not in the past, and they're not completed
    goals.forEach(goal => {
      if (goal.startDate && goal.startDate >= today && goal.status !== "completed") {
        const startDate = new Date(goal.startDate);
        const endDate = new Date(goal.startDate);
        endDate.setHours(23, 59, 59);
        
        calendarEvents.push({
          id: `goal-${goal.id}`,
          title: goal.title,
          start: startDate,
          end: endDate,
          type: "goal",
          color: "#8b8b8b",
          description: goal.description
        });
      }
    });
    setEvents(calendarEvents);
  }, [tasks, goals, isLoading]);

  // Function to get calendar days for the current month
  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of month and last day of month
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    // Get the day of week for first day (0 = Sunday, 1 = Monday, etc.)
    const firstDayOfWeek = firstDayOfMonth.getDay();
    
    // Get the last date of the month
    const lastDateOfMonth = lastDayOfMonth.getDate();
    
    // Get the last day of previous month to fill in the grid
    const lastDayOfPrevMonth = new Date(year, month, 0);
    const lastDateOfPrevMonth = lastDayOfPrevMonth.getDate();
    
    const days = [];
    
    // Add days from previous month to fill the first week
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const date = lastDateOfPrevMonth - i;
      days.push({
        date,
        month: month - 1,
        year: month === 0 ? year - 1 : year,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // Add days from current month
    for (let date = 1; date <= lastDateOfMonth; date++) {
      const today = new Date();
      days.push({
        date,
        month,
        year,
        isCurrentMonth: true,
        isToday: date === today.getDate() && month === today.getMonth() && year === today.getFullYear()
      });
    }
    
    // Add days from next month to fill the last week (always 42 total cells for 6 rows)
    const remainingCells = 42 - days.length;
    for (let date = 1; date <= remainingCells; date++) {
      days.push({
        date,
        month: month + 1,
        year: month === 11 ? year + 1 : year,
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    return days;
  };

  const handleDateSelect = (slotInfo: any) => {
    // Get the date from the slot selection
    const date = slotInfo.start;
    
    // Format date for display
    const formattedDate = date.toISOString().split('T')[0];
    
    // Find events for this date
    const dateEvents = events.filter(event => 
      event.start.toISOString().split('T')[0] === formattedDate
    );
    
    if (dateEvents.length > 0) {
      // Show events list modal
      setSelectedDate(formattedDate);
      setDateEvents(dateEvents);
      setShowDateEventsModal(true);
    } else {
      // Show add modal for empty date
      setSelectedDate(formattedDate);
      // Reset form data to ensure it's empty
      setFormData({
        title: "",
        description: "",
        type: "task",
        priority: "medium",
        target: "",
        unit: "",
        cadence: "monthly"
      });
      setShowAddModal(true);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.type === "task") {
      addTask({
        title: formData.title,
        description: formData.description,
        status: "pending",
        priority: formData.priority,
        dueDate: selectedDate,
        tags: []
      });
    } else if (formData.type === "goal") {
      addGoal({
        title: formData.title,
        description: formData.description,
        target: parseFloat(formData.target) || 0,
        unit: formData.unit,
        cadence: formData.cadence,
        startDate: selectedDate
      });
    }
    
    // Reset form and close modal
    setFormData({
      title: "",
      description: "",
      type: "task",
      priority: "medium",
      target: "",
      unit: "",
      cadence: "monthly"
    });
    setShowAddModal(false);
    setSelectedDate("");
  };

  const handleMoreLinkClick = (clickInfo: any) => {
    // Get the date from the click info
    const date = clickInfo.date;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    // Find events for this date
    const dateEvents = events.filter(event => 
      event.start.toISOString().split('T')[0] === formattedDate
    );
    
    if (dateEvents.length > 0) {
      // Show events list modal
      setSelectedDate(formattedDate);
      setDateEvents(dateEvents);
      setShowDateEventsModal(true);
    }
  };

  const handleEventClick = (event: CalendarEvent) => {
    // Find the actual task/goal data
    let itemData: any = null;
    if (event.type === 'task') {
      itemData = tasks.find(t => `task-${t.id}` === event.id);
    } else if (event.type === 'goal') {
      itemData = goals.find(g => `goal-${g.id}` === event.id);
    }
    
    // Show event details in a modal
    setSelectedEvent({
      title: event.title,
      type: event.type || 'Unknown',
      description: itemData?.description || event.description || 'No description available',
      priority: itemData?.priority || event.priority || 'medium',
      status: itemData?.status || 'pending',
      color: event.color || "#3b82f6"
    });
    setShowEventModal(true);
  };

  const handleEventFromListClick = (event: CalendarEvent) => {
    // Find the actual task/goal data
    let itemData: any = null;
    if (event.type === 'task') {
      itemData = tasks.find(t => `task-${t.id}` === event.id);
    } else if (event.type === 'goal') {
      itemData = goals.find(g => `goal-${g.id}` === event.id);
    }
    
    // Show event details in a modal
    setSelectedEvent({
      title: event.title,
      type: event.type,
      description: itemData?.description || 'No description available',
      priority: itemData?.priority || 'medium',
      status: itemData?.status || 'pending',
      color: event.color || "#3b82f6"
    });
    setShowEventModal(true);
    setShowDateEventsModal(false); // Close the date events modal
  };

  const handleEditDescription = () => {
    setIsEditingDescription(true);
    setEditingDescription(selectedEvent.description || '');
  };

  const handleSaveDescription = () => {
    // Update the selectedEvent with new description
    setSelectedEvent({
      ...selectedEvent,
      description: editingDescription
    });
    setIsEditingDescription(false);
    
    // TODO: Here you would typically update the actual task/goal in your data store
    // For now, we're just updating the local state
  };

  const handleCancelEdit = () => {
    setIsEditingDescription(false);
    setEditingDescription(selectedEvent.description || '');
  };

  const handleEditTitle = () => {
    setIsEditingTitle(true);
    setEditingTitle(selectedEvent.title || '');
  };

  const handleSaveTitle = () => {
    setSelectedEvent({
      ...selectedEvent,
      title: editingTitle
    });
    setIsEditingTitle(false);
  };

  const handleCancelTitleEdit = () => {
    setIsEditingTitle(false);
    setEditingTitle(selectedEvent.title || '');
  };

  const handleEditType = () => {
    setIsEditingType(true);
  };

  const handleSaveType = (newType: 'task' | 'goal') => {
    setSelectedEvent({
      ...selectedEvent,
      type: newType
    });
    setIsEditingType(false);
  };

  const handleCancelTypeEdit = () => {
    setIsEditingType(false);
  };

  const handleEditPriority = () => {
    setIsEditingPriority(true);
  };

  const handleSavePriority = (newPriority: string) => {
    setSelectedEvent({
      ...selectedEvent,
      priority: newPriority
    });
    setIsEditingPriority(false);
  };

  const handleCancelPriorityEdit = () => {
    setIsEditingPriority(false);
  };





  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Loading Calendar...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* View Controls */}
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
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Calendar View
            </CardTitle>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  setSelectedDate(new Date().toISOString().split('T')[0]);
                  setShowAddModal(true);
                }}
                className="flex items-center font-semibold transition-all duration-300 rounded-md px-4 py-2 h-10"
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
                Add Item
              </button>
              <button 
                        onClick={() => {
          if (typeof window !== 'undefined') {
            localStorage.clear();
            window.location.reload();
          }
        }}
                className="flex items-center justify-center font-semibold transition-all duration-300 rounded-md px-3 py-1 h-8 text-sm"
                style={{
                  backgroundColor: 'white',
                  borderColor: 'rgb(239 68 68)',
                  color: 'rgb(239 68 68)',
                  borderWidth: '2px',
                  borderStyle: 'solid'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgb(239 68 68)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'rgb(239 68 68)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Reset Data
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setView("month")}
              className="flex items-center font-semibold transition-all duration-300 rounded-md px-3 py-1 h-8 text-sm"
              style={{
                backgroundColor: view === "month" ? 'rgb(234 88 12)' : 'white',
                color: view === "month" ? 'white' : 'rgb(234 88 12)',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'rgb(234 88 12)'
              }}
              onMouseEnter={(e) => {
                if (view !== "month") {
                  e.currentTarget.style.backgroundColor = 'rgb(234 88 12)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (view !== "month") {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'rgb(234 88 12)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <Grid className="h-4 w-4 mr-2" />
              Month
            </button>
            <button
              onClick={() => setView("week")}
              className="flex items-center font-semibold transition-all duration-300 rounded-md px-3 py-1 h-8 text-sm"
              style={{
                backgroundColor: view === "week" ? 'rgb(234 88 12)' : 'white',
                color: view === "week" ? 'white' : 'rgb(234 88 12)',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'rgb(234 88 12)'
              }}
              onMouseEnter={(e) => {
                if (view !== "week") {
                  e.currentTarget.style.backgroundColor = 'rgb(234 88 12)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (view !== "week") {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'rgb(234 88 12)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <List className="h-4 w-4 mr-2" />
              Week
            </button>
            <button
              onClick={() => setView("day")}
              className="flex items-center font-semibold transition-all duration-300 rounded-md px-3 py-1 h-8 text-sm"
              style={{
                backgroundColor: view === "day" ? 'rgb(234 88 12)' : 'white',
                color: view === "day" ? 'white' : 'rgb(234 88 12)',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: 'rgb(234 88 12)'
              }}
              onMouseEnter={(e) => {
                if (view !== "day") {
                  e.currentTarget.style.backgroundColor = 'rgb(234 88 12)';
                  e.currentTarget.style.color = 'white';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }
              }}
              onMouseLeave={(e) => {
                if (view !== "day") {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.color = 'rgb(234 88 12)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'scale(1)';
                }
              }}
            >
              <Clock className="h-4 w-4 mr-2" />
              Day
            </button>
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Tasks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Goals</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
              <span>Metrics</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar */}
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
        <CardContent className="p-6">
          <div className="h-[600px]">
            <div className="h-full">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setCurrentDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <button
                  onClick={() => {
                    const newDate = new Date(currentDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setCurrentDate(newDate);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1">
                {/* Day Headers */}
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 bg-gray-50 rounded-lg">
                    {day}
                  </div>
                ))}

                {/* Calendar Days */}
                {getCalendarDays().map((day, index) => {
                  const dayEvents = events.filter(event => {
                    const eventDate = new Date(event.start);
                    return eventDate.getDate() === day.date && 
                           eventDate.getMonth() === day.month && 
                           eventDate.getFullYear() === day.year;
                  });

                  return (
                                         <div
                       key={index}
                       onClick={() => handleDateSelect({ start: new Date(day.year, day.month, day.date) })}
                       className={`p-2 min-h-[80px] border rounded-lg cursor-pointer transition-colors bg-white hover:bg-gray-50 ${
                         day.isToday ? 'ring-2 ring-orange-500 ring-opacity-50' : ''
                       }`}
                     >
                                             <div className="text-sm font-medium mb-1 font-bold" style={{ color: '#f97316', textShadow: '0 0 1px rgba(249, 115, 22, 0.3)' }}>
                         {day.date}
                       </div>
                      
                      {/* Events for this day */}
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className="text-xs p-1 rounded text-white truncate"
                            style={{ backgroundColor: event.color || '#3b82f6' }}
                            title={event.title}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 text-center">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 calendar-modal">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 
                  className="text-xl font-semibold text-orange-600"
                  style={{ 
                    color: 'rgb(234 88 12) !important',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    fontWeight: '800',
                    WebkitTextFillColor: 'rgb(234 88 12)',
                    WebkitTextStroke: '0.5px rgba(0,0,0,0.1)',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                  }}
                >
                  Add to Calendar
                </h2>
                {selectedDate && (
                  <p 
                    className="text-sm text-orange-500 mt-1"
                    style={{ 
                      color: 'rgb(234 88 12) !important',
                      textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                      fontWeight: '700',
                      WebkitTextFillColor: 'rgb(234 88 12)'
                    }}
                  >
                    Date: {(() => {
                      const [year, month, day] = selectedDate.split('-');
                      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                      return date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      });
                    })()}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddModal(false)}
                className="calendar-close-button text-gray-500 hover:text-red-600 hover:bg-red-100 transition-all duration-300 hover:shadow-xl hover:shadow-red-300 hover:scale-110 rounded-lg p-2"
                style={{
                  boxShadow: 'none'
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <Label htmlFor="type" style={{ color: 'rgb(234 88 12) !important', fontWeight: '600' }}>Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as "task" | "goal"})}
                  className="w-full h-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="task">Task</option>
                  <option value="goal">Goal</option>
                </select>
              </div>

              <div>
                <Label htmlFor="title" style={{ color: 'rgb(234 88 12) !important', fontWeight: '600' }}>Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter title"
                  required
                  className="focus:ring-orange-500"
                />
              </div>

              <div>
                <Label htmlFor="description" style={{ color: 'rgb(234 88 12) !important', fontWeight: '600' }}>Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter description"
                  className="focus:ring-orange-500"
                />
              </div>

              {formData.type === "task" && (
                <div>
                  <Label htmlFor="priority" style={{ color: 'rgb(234 88 12) !important', fontWeight: '600' }}>Priority</Label>
                  <select
                    id="priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({...formData, priority: e.target.value as "low" | "medium" | "high" | "urgent"})}
                    className="w-full h-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              )}

              {formData.type === "goal" && (
                <>
                  <div>
                    <Label htmlFor="target" style={{ color: 'rgb(234 88 12) !important', fontWeight: '600' }}>Target</Label>
                    <Input
                      id="target"
                      type="number"
                      value={formData.target}
                      onChange={(e) => setFormData({...formData, target: e.target.value})}
                      placeholder="Enter target value"
                      className="focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="unit" style={{ color: 'rgb(234 88 12) !important', fontWeight: '600' }}>Unit</Label>
                    <Input
                      id="unit"
                      value={formData.unit}
                      onChange={(e) => setFormData({...formData, unit: e.target.value})}
                      placeholder="e.g., dollars, hours, etc."
                      className="focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cadence" style={{ color: 'rgb(234 88 12) !important', fontWeight: '600' }}>Cadence</Label>
                    <select
                      id="cadence"
                      value={formData.cadence}
                      onChange={(e) => setFormData({...formData, cadence: e.target.value as "daily" | "weekly" | "monthly"})}
                      className="w-full h-10 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 font-semibold transition-all duration-300 rounded-md px-4 py-2 h-10 calendar-add-button"
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
                  Add {formData.type === "task" ? "Task" : "Goal"}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="transition-all duration-300 rounded-md px-4 py-2 h-10 calendar-cancel-button"
                  style={{
                    backgroundColor: 'white',
                    borderColor: 'rgb(239 68 68)',
                    color: 'rgb(239 68 68)',
                    borderWidth: '2px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(239 68 68)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'rgb(239 68 68)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              {isEditingTitle ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-2xl font-bold"
                    style={{ 
                      color: 'rgb(234 88 12)',
                      borderColor: 'rgb(234 88 12)',
                      backgroundColor: 'white'
                    }}
                    placeholder="Enter title..."
                  />
                  <div className="flex gap-2">
                                          <button
                        onClick={handleSaveTitle}
                        className="font-semibold transition-all duration-300 rounded-md px-3 py-1 h-9 text-sm"
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
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.color = 'rgb(234 88 12)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Confirm
                      </button>
                    <button
                      onClick={handleCancelTitleEdit}
                      className="transition-all duration-300 rounded-md px-3 py-1 h-9 text-sm"
                      style={{
                        backgroundColor: 'white',
                        borderColor: 'rgb(239 68 68)',
                        color: 'rgb(239 68 68)',
                        borderWidth: '2px',
                        borderStyle: 'solid'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(239 68 68)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = 'rgb(239 68 68)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <h2 
                  className="text-2xl font-bold tracking-tight cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={handleEditTitle}
                  style={{ 
                    color: 'rgb(234 88 12) !important',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    fontWeight: '800',
                    WebkitTextFillColor: 'rgb(234 88 12)',
                    WebkitTextStroke: '0.5px rgba(0,0,0,0.1)',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                  }}
                >
                  {selectedEvent.title}
                </h2>
              )}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowEventModal(false)}
                className="text-gray-500 hover:text-red-600 hover:bg-red-100 transition-all duration-300 hover:shadow-xl hover:shadow-red-300 hover:scale-110 rounded-lg p-2"
                style={{
                  boxShadow: 'none'
                }}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Type Badge */}
              <div className="flex items-center gap-3">
                {isEditingType ? (
                  <div className="flex gap-2 items-center">
                    <select
                      value={selectedEvent.type}
                      onChange={(e) => handleSaveType(e.target.value as 'task' | 'goal')}
                      className="p-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-semibold"
                      style={{ 
                        borderColor: selectedEvent.color,
                        backgroundColor: 'white',
                        color: 'rgb(234 88 12)',
                        borderWidth: '2px'
                      }}
                    >
                      <option value="task">Task</option>
                      <option value="goal">Goal</option>
                    </select>
                    <button
                      onClick={handleCancelTypeEdit}
                      className="text-xs transition-all duration-300 rounded-md px-3 py-1 h-9"
                      style={{
                        backgroundColor: 'white',
                        borderColor: 'rgb(239 68 68)',
                        color: 'rgb(239 68 68)',
                        borderWidth: '2px',
                        borderStyle: 'solid'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgb(239 68 68)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white';
                        e.currentTarget.style.color = 'rgb(239 68 68)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <Badge 
                    variant="outline"
                    className="text-sm font-semibold px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ 
                      borderColor: selectedEvent.color,
                      color: selectedEvent.color,
                      borderWidth: '2px'
                    }}
                    onClick={handleEditType}
                  >
                    {selectedEvent.type.charAt(0).toUpperCase() + selectedEvent.type.slice(1)}
                  </Badge>
                )}
                
                {selectedEvent.type === 'task' && (
                  isEditingPriority ? (
                    <div className="flex gap-2 items-center">
                      <select
                        value={selectedEvent.priority}
                        onChange={(e) => handleSavePriority(e.target.value)}
                        className="p-2 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-semibold"
                        style={{ 
                          borderColor: selectedEvent.color,
                          backgroundColor: 'white',
                          color: 'rgb(234 88 12)',
                          borderWidth: '2px'
                        }}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                      <button
                        onClick={handleCancelPriorityEdit}
                        className="text-xs transition-all duration-300 rounded-md px-3 py-1 h-9"
                        style={{
                          backgroundColor: 'white',
                          borderColor: 'rgb(239 68 68)',
                          color: 'rgb(239 68 68)',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgb(239 68 68)';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.color = 'rgb(239 68 68)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <Badge 
                      variant="outline"
                      className="text-sm font-semibold px-3 py-1 cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ 
                        borderColor: selectedEvent.color,
                        color: selectedEvent.color,
                        borderWidth: '2px'
                      }}
                      onClick={handleEditPriority}
                    >
                      {selectedEvent.priority.charAt(0).toUpperCase() + selectedEvent.priority.slice(1)} Priority
                    </Badge>
                  )
                )}
              </div>

              {/* Description */}
              <div 
                className="p-6 rounded-xl border-3 shadow-lg"
                style={{ 
                  borderColor: selectedEvent.color,
                  backgroundColor: `${selectedEvent.color}08`,
                  borderWidth: '3px'
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold" style={{ color: selectedEvent.color }}>
                    Description:
                  </h3>
                  {!isEditingDescription && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleEditDescription}
                      className="text-xs text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                    >
                      Edit
                    </Button>
                  )}
                </div>
                
                {isEditingDescription ? (
                  <div className="space-y-3">
                    <textarea
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      className="w-full p-3 border-2 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-orange-300"
                      style={{ 
                        borderColor: selectedEvent.color,
                        backgroundColor: 'white',
                        color: 'rgb(234 88 12)',
                        fontWeight: '600'
                      }}
                      rows={3}
                      placeholder="Enter description..."
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleSaveDescription}
                        className="font-semibold transition-all duration-300 rounded-md px-3 py-1 h-9 text-sm"
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
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.color = 'rgb(234 88 12)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Confirm
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="transition-all duration-300 rounded-md px-3 py-1 h-9 text-sm"
                        style={{
                          backgroundColor: 'white',
                          borderColor: 'rgb(239 68 68)',
                          color: 'rgb(239 68 68)',
                          borderWidth: '2px',
                          borderStyle: 'solid'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = 'rgb(239 68 68)';
                          e.currentTarget.style.color = 'white';
                          e.currentTarget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
                          e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'white';
                          e.currentTarget.style.color = 'rgb(239 68 68)';
                          e.currentTarget.style.boxShadow = 'none';
                          e.currentTarget.style.transform = 'scale(1)';
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <p 
                    className="text-sm leading-relaxed font-medium cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                    style={{ color: 'rgb(234 88 12)' }}
                    onClick={handleEditDescription}
                  >
                    {selectedEvent.description}
                  </p>
                )}
              </div>

              {/* Status */}
              {selectedEvent.type === 'task' && (
                <div className="flex items-center gap-3">
                  <span 
                    className="text-sm font-semibold"
                    style={{ color: 'rgb(234 88 12)' }}
                  >
                    Status:
                  </span>
                  <Badge 
                    variant="outline"
                    className="text-sm font-semibold px-3 py-1"
                    style={{ 
                      borderColor: selectedEvent.color,
                      color: selectedEvent.color,
                      borderWidth: '2px'
                    }}
                  >
                    {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                  </Badge>
                </div>
              )}

              <div className="flex gap-3 pt-6">
                <button 
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 h-10 font-semibold transition-all duration-300 rounded-md px-4 py-2"
                  style={{
                    backgroundColor: 'white',
                    borderColor: 'rgb(239 68 68)',
                    color: 'rgb(239 68 68)',
                    borderWidth: '2px',
                    borderStyle: 'solid'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgb(239 68 68)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'rgb(239 68 68)';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Date Events Modal */}
      {showDateEventsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  <span style={{ 
                    color: 'rgb(234 88 12) !important',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    fontWeight: '800',
                    WebkitTextFillColor: 'rgb(234 88 12)',
                    WebkitTextStroke: '0.5px rgba(0,0,0,0.1)',
                    filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                  }}>
                    Events for {(() => {
                      const [year, month, day] = selectedDate.split('-');
                      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
                      return date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      });
                    })()}
                  </span>
                </h2>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    setShowDateEventsModal(false);
                    setShowAddModal(true);
                  }}
                  className="calendar-add-button hover:!bg-orange-600 hover:!border-orange-600 transition-all duration-200"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Event
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowDateEventsModal(false)}
                  className="text-gray-500 hover:text-red-600 hover:bg-red-100 transition-all duration-300 hover:shadow-xl hover:shadow-red-300 hover:scale-110 rounded-lg p-2"
                  style={{
                    boxShadow: 'none'
                  }}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {dateEvents.map((event) => {
                // Find the actual task/goal data
                let itemData: any = null;
                if (event.type === 'task') {
                  itemData = tasks.find(t => `task-${t.id}` === event.id);
                } else if (event.type === 'goal') {
                  itemData = goals.find(g => `goal-${g.id}` === event.id);
                }

                return (
                  <div 
                    key={event.id}
                    className="p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-white"
                    style={{ 
                      borderColor: event.color,
                      borderWidth: '3px'
                    }}
                    onClick={() => handleEventFromListClick(event)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 
                          className="text-lg font-bold mb-2"
                          style={{ 
                            color: 'rgb(234 88 12) !important',
                            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            fontWeight: '800',
                            WebkitTextFillColor: 'rgb(234 88 12)',
                            WebkitTextStroke: '0.5px rgba(0,0,0,0.1)',
                            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))'
                          }}
                        >
                          {event.title}
                        </h3>
                        
                        <div className="flex items-center gap-3 mb-3">
                          <Badge 
                            variant="outline"
                            className="text-xs font-semibold px-2 py-1 bg-white"
                            style={{ 
                              borderColor: event.color,
                              color: event.color,
                              borderWidth: '2px',
                              backgroundColor: 'white'
                            }}
                          >
                            {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                          </Badge>
                          {event.type === 'task' && itemData?.priority && (
                            <Badge 
                              variant="outline"
                              className="text-xs font-semibold px-2 py-1 bg-white"
                              style={{ 
                                borderColor: event.color,
                                color: event.color,
                                borderWidth: '2px',
                                backgroundColor: 'white'
                              }}
                            >
                              {itemData.priority.charAt(0).toUpperCase() + itemData.priority.slice(1)} Priority
                            </Badge>
                          )}
                        </div>

                        {itemData?.description && (
                          <div 
                            className="p-3 rounded-lg border-2"
                            style={{ 
                              borderColor: event.color,
                              backgroundColor: `${event.color}30`,
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.15)'
                            }}
                          >
                            <p 
                              className="text-sm leading-relaxed font-bold"
                              style={{ 
                                color: 'rgb(234 88 12)',
                                textShadow: '0 1px 3px rgba(255,255,255,1)',
                                fontWeight: '700'
                              }}
                            >
                              {itemData.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-3 pt-6 mt-6 border-t">
              <Button 
                variant="outline" 
                onClick={() => setShowDateEventsModal(false)}
                className="flex-1 h-10 font-semibold hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

