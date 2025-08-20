"use client";

import React, { useState } from "react";
import { useData } from "@/lib/data-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BarChart3, 
  Plus, 
  TrendingUp,
  TrendingDown,
  Minus,
  Plus as PlusIcon,
  Trash2,
  Calendar
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface Metric {
  id: string;
  name: string;
  description?: string;
  unit: string;
  color: string;
  createdAt: string;
}

interface MetricLog {
  id: string;
  metricId: string;
  value: number;
  date: string;
  notes?: string;
}

export function MetricsView() {
  const { metrics, metricLogs, addMetric, addMetricLog, updateMetric, deleteMetric, deleteMetricLog, isLoading } = useData();

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Loading Metrics...
          </h1>
        </div>
      </div>
    );
  }

  const [showAddMetric, setShowAddMetric] = useState(false);
  const [showAddLog, setShowAddLog] = useState<string | null>(null);
  const [newMetric, setNewMetric] = useState({
    name: "",
    description: "",
    unit: "",
    color: "#3b82f6"
  });
  const [newLog, setNewLog] = useState({
    value: "",
    notes: ""
  });

  const getMetricLogs = (metricId: string) => {
    return metricLogs.filter(log => log.metricId === metricId);
  };

  const getMetricStats = (metricId: string) => {
    const logs = getMetricLogs(metricId);
    if (logs.length === 0) return { sum: 0, avg: 0, min: 0, max: 0 };
    
    const values = logs.map(log => log.value);
    return {
      sum: values.reduce((a, b) => a + b, 0),
      avg: values.reduce((a, b) => a + b, 0) / values.length,
      min: Math.min(...values),
      max: Math.max(...values)
    };
  };

  const getChartData = (metricId: string) => {
    const logs = getMetricLogs(metricId);
    return logs
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(log => ({
        date: new Date(log.date).toLocaleDateString(),
        value: log.value
      }));
  };

  const handleAddMetric = (e: React.FormEvent) => {
    e.preventDefault();
    addMetric({
      name: newMetric.name,
      description: newMetric.description,
      unit: newMetric.unit,
      color: newMetric.color
    });
    setNewMetric({
      name: "",
      description: "",
      unit: "",
      color: "#3b82f6"
    });
    setShowAddMetric(false);
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAddLog) return;
    
    addMetricLog({
      metricId: showAddLog,
      value: parseFloat(newLog.value) || 0,
      date: new Date().toISOString().split('T')[0],
      notes: newLog.notes
    });
    setNewLog({
      value: "",
      notes: ""
    });
    setShowAddLog(null);
  };

  const handleDeleteMetric = (metricId: string) => {
    if (confirm("Are you sure you want to delete this metric? All logs will be lost.")) {
      deleteMetric(metricId);
    }
  };

  const handleDeleteLog = (logId: string) => {
    deleteMetricLog(logId);
  };

  return (
    <div className="space-y-6">
      {/* Add Metric Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Metrics</h2>
        <button 
          onClick={() => setShowAddMetric(true)} 
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
          Add Metric
        </button>
      </div>

      {/* Add Metric Form */}
      {showAddMetric && (
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
            <CardTitle>Add New Metric</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddMetric} className="space-y-4">
              <div>
                <Label htmlFor="name">Metric Name</Label>
                <Input
                  id="name"
                  value={newMetric.name}
                  onChange={(e) => setNewMetric(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Sales Calls"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newMetric.description}
                  onChange={(e) => setNewMetric(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe what this metric tracks..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unit">Unit</Label>
                  <Input
                    id="unit"
                    value={newMetric.unit}
                    onChange={(e) => setNewMetric(prev => ({ ...prev, unit: e.target.value }))}
                    placeholder="e.g., calls, dollars, minutes"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    type="color"
                    value={newMetric.color}
                    onChange={(e) => setNewMetric(prev => ({ ...prev, color: e.target.value }))}
                    className="h-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button type="submit" className="hover:bg-orange-600 hover:border-orange-600 transition-all duration-200">Create Metric</Button>
                <Button type="button" variant="outline" className="hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600 transition-all duration-200" onClick={() => setShowAddMetric(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {metrics.map(metric => {
          const stats = getMetricStats(metric.id);
          const chartData = getChartData(metric.id);
          const recentLogs = getMetricLogs(metric.id).slice(-5).reverse();
          
          return (
            <Card 
              key={metric.id}
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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: metric.color }}
                      />
                      {metric.name}
                    </CardTitle>
                    {metric.description && (
                      <p className="text-sm text-gray-600 mt-1">{metric.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteMetric(metric.id)}
                    className="p-2 transition-all duration-300 rounded-md hover:bg-red-100"
                  >
                    <Trash2 
                      className="h-4 w-4 transition-all duration-300" 
                      style={{
                        color: 'white'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'rgb(239 68 68)';
                        e.currentTarget.style.filter = 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.8))';
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.filter = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                  </button>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: metric.color }}>
                      {stats.sum}
                    </div>
                    <div className="text-xs text-gray-600">Total {metric.unit}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: metric.color }}>
                      {Math.round(stats.avg)}
                    </div>
                    <div className="text-xs text-gray-600">Avg {metric.unit}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: metric.color }}>
                      {stats.min}
                    </div>
                    <div className="text-xs text-gray-600">Min {metric.unit}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold" style={{ color: metric.color }}>
                      {stats.max}
                    </div>
                    <div className="text-xs text-gray-600">Max {metric.unit}</div>
                  </div>
                </div>

                {/* Chart */}
                {chartData.length > 0 && (
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={metric.color}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Recent Logs */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Recent Logs</h4>
                    <Button
                      size="sm"
                      onClick={() => setShowAddLog(metric.id)}
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Log
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {recentLogs.map(log => (
                      <div key={log.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div>
                          <div className="font-medium">{log.value} {metric.unit}</div>
                          <div className="text-xs text-gray-600">
                            {new Date(log.date).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {log.notes && (
                            <span className="text-xs text-gray-500">{log.notes}</span>
                          )}
                          <button
                            onClick={() => deleteMetricLog(log.id)}
                            className="p-1 transition-all duration-300 rounded-md hover:bg-red-100"
                          >
                            <Trash2 
                              className="h-3 w-3 transition-all duration-300" 
                              style={{
                                color: 'white'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = 'rgb(239 68 68)';
                                e.currentTarget.style.filter = 'drop-shadow(0 0 6px rgba(239, 68, 68, 0.8))';
                                e.currentTarget.style.transform = 'scale(1.1)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'white';
                                e.currentTarget.style.filter = 'none';
                                e.currentTarget.style.transform = 'scale(1)';
                              }}
                            />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Log Form */}
                {showAddLog === metric.id && (
                  <form onSubmit={handleAddLog} className="space-y-3 p-4 bg-gray-50 rounded">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="value">Value</Label>
                        <Input
                          id="value"
                          type="number"
                          value={newLog.value}
                          onChange={(e) => setNewLog(prev => ({ ...prev, value: e.target.value }))}
                          placeholder={`Enter ${metric.unit}`}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="notes">Notes</Label>
                        <Input
                          id="notes"
                          value={newLog.notes}
                          onChange={(e) => setNewLog(prev => ({ ...prev, notes: e.target.value }))}
                          placeholder="Optional notes"
                        />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm">Add Log</Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowAddLog(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

