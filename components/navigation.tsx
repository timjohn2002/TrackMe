"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/", emoji: "🏠" },
  { name: "Calendar", href: "/calendar", emoji: "📅" },
  { name: "Tasks", href: "/tasks", emoji: "✅" },
  { name: "Goals", href: "/goals", emoji: "🎯" },
  { name: "Metrics", href: "/metrics", emoji: "📊" },
  { name: "Reports", href: "/reports", emoji: "📋" },
];

export function Navigation() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <nav className="bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex space-x-8">
              {navigation.map((item) => {
                const isActive = isClient && pathname === item.href;
                return (
                  <Link key={item.name} href={item.href}>
                    <button
                      className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-transparent text-gray-700 hover:text-orange-600"
                      }`}
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
                      <span className="text-lg">{item.emoji}</span>
                      {item.name}
                    </button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

