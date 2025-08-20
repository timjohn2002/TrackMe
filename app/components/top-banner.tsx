import React, { useState, useEffect } from "react";
import { differenceInDays, startOfYear, addYears } from "date-fns";
import { Calendar, Info, Home, CheckCircle, Target, BarChart3, FileText } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home, emoji: "🏠" },
  { name: "Calendar", href: "/calendar", icon: Calendar, emoji: "📅" },
  { name: "Tasks", href: "/tasks", icon: CheckCircle, emoji: "✅" },
  { name: "Goals", href: "/goals", icon: Target, emoji: "🎯" },
  { name: "Metrics", href: "/metrics", icon: BarChart3, emoji: "📊" },
  { name: "Reports", href: "/reports", icon: FileText, emoji: "📄" },
];

export function TopBanner() {
  const [daysLeft, setDaysLeft] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const calculateDaysLeft = () => {
      const now = new Date();
      const yearEnd = startOfYear(addYears(now, 1));
      const days = differenceInDays(yearEnd, now);
      setDaysLeft(days);
    };

    calculateDaysLeft();
    const interval = setInterval(calculateDaysLeft, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header with Navigation */}
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <Calendar className="h-8 w-8 text-white" />
              <h1 className="text-xl font-bold text-white">TrackMe</h1>
            </div>
            
            {/* Navigation Categories - Now in the main header */}
            <nav className="hidden md:flex items-center space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <button
                      className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors border-0 outline-none ${
                        isActive 
                          ? "bg-white/20 text-white" 
                          : "hover:bg-white/10 text-white/90 hover:text-white"
                      }`}
                    >
                      <span className="text-lg">{item.emoji}</span>
                      <item.icon className="h-4 w-4 text-white" />
                      <span className="text-white">{item.name}</span>
                    </button>
                  </Link>
                );
              })}
            </nav>
          </div>
          
          {/* Right side - Days left counter */}
          <button className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium hover:bg-white/10 rounded-md transition-colors">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-white">
                {daysLeft} days left this year
              </span>
              <Info className="h-4 w-4 text-white" />
            </div>
          </button>
        </div>
        
        {/* Mobile Navigation - For smaller screens */}
        <div className="md:hidden border-t border-white/10">
          <nav className="py-2">
            <div className="flex justify-center">
              <div className="flex space-x-1 overflow-x-auto">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link key={item.name} href={item.href}>
                      <button
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-md transition-colors border-0 outline-none whitespace-nowrap ${
                          isActive 
                            ? "bg-white/20 text-white" 
                            : "hover:bg-white/10 text-white/90 hover:text-white"
                        }`}
                      >
                        <span className="text-sm">{item.emoji}</span>
                        <item.icon className="h-3 w-3 text-white" />
                        <span className="text-white">{item.name}</span>
                      </button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
