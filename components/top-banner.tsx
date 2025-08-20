"use client";

import { useState, useEffect } from "react";
import { differenceInDays, startOfYear, addYears } from "date-fns";
import { Calendar, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function TopBanner() {
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [nextYear, setNextYear] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setMounted(true);
    
    const now = new Date();
    const nextYearDate = startOfYear(addYears(now, 1));
    const daysRemaining = differenceInDays(nextYearDate, now);
    
    setDaysLeft(daysRemaining);
    setNextYear(nextYearDate);

    // Update at midnight
    const now2 = new Date();
    const tomorrow = new Date(now2);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const timeUntilMidnight = tomorrow.getTime() - now2.getTime();
    
    const timer = setTimeout(() => {
      setDaysLeft(differenceInDays(nextYearDate, new Date()));
    }, timeUntilMidnight);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - App title */}
          <div className="flex items-center space-x-3">
            <Calendar className="h-8 w-8" />
            <h1 className="text-xl font-bold">TrackMe</h1>
          </div>

          {/* Right side - Days left */}
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-white hover:bg-white/10 transition-all duration-300"
                  style={{
                    boxShadow: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 88, 12, 0.6)';
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <div className="flex items-center space-x-2">
                    {mounted ? (
                      <>
                        <span className="text-sm font-medium">
                          {daysLeft} days left this year
                        </span>
                        <Info className="h-4 w-4" />
                      </>
                    ) : (
                      <span className="text-sm font-medium">
                        Loading...
                      </span>
                    )}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                side="bottom" 
                align="end"
                className="max-w-[120px] text-xs p-1 z-50"
                sideOffset={12}
                style={{
                  backgroundColor: 'white',
                  color: 'rgb(234 88 12)',
                  border: '2px solid rgb(234 88 12)',
                  boxShadow: '0 0 20px rgba(234, 88, 12, 0.6)'
                }}
              >
                <div className="text-center font-medium leading-tight">
                  {mounted && nextYear ? (
                    <>
                      <div className="mb-1">Next Year Starts On</div>
                      <div>
                        {nextYear.toLocaleDateString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

