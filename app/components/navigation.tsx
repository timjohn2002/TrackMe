import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home,
  Calendar,
  CheckCircle,
  Target,
  BarChart3,
  FileText
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Tasks", href: "/tasks", icon: CheckCircle },
  { name: "Goals", href: "/goals", icon: Target },
  { name: "Metrics", href: "/metrics", icon: BarChart3 },
  { name: "Reports", href: "/reports", icon: FileText },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-transparent py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="flex space-x-1 md:space-x-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <button
                    className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive 
                        ? "bg-white/20 text-white shadow-sm" 
                        : "hover:bg-white/10 text-white/90 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.name}</span>
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
