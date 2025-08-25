"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Home, Calendar, User, Grid } from "lucide-react";

interface SidebarLinkProps {
  link: {
    label: string;
    icon: string;
    link: string;
  };
}

const iconMap = {
  Grid: Grid,
  Calendar: Calendar,
  User: User,
  Home: Home,
};

export default function SidebarLink({ link }: SidebarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === link.link;
  const IconComponent = iconMap[link.icon as keyof typeof iconMap] || Home;

  return (
    <Link
      href={link.link}
      className={cn(
        "group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 w-full",
        "hover:bg-white/10 hover:scale-105 hover:shadow-lg dark:hover:bg-white/5",
        "text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white",
        isActive
          ? "bg-gradient-to-r from-blue-600/20 to-emerald-600/20 dark:from-blue-500/30 dark:to-emerald-500/30 text-white shadow-lg border border-blue-500/30 dark:border-blue-400/40"
          : "hover:border hover:border-white/20 dark:hover:border-white/10"
      )}
    >
      {/* Active indicator */}
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-emerald-400 dark:from-blue-300 dark:to-emerald-300 rounded-r-full" />
      )}

      {/* Icon with glow effect */}
      <div
        className={cn(
          "relative transition-all duration-300",
          isActive
            ? "text-blue-400 dark:text-blue-300"
            : "text-gray-400 dark:text-gray-500 group-hover:text-blue-300 dark:group-hover:text-blue-200"
        )}
      >
        <IconComponent className="h-5 w-5" />
        {isActive && (
          <div className="absolute inset-0 bg-blue-400/20 dark:bg-blue-300/20 rounded-full blur-md" />
        )}
      </div>

      {/* Label */}
      <span
        className={cn(
          "font-medium transition-all duration-300",
          isActive
            ? "text-white"
            : "text-gray-300 dark:text-gray-400 group-hover:text-white"
        )}
      >
        {link.label}
      </span>

      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-emerald-600/5 dark:from-blue-500/10 dark:to-emerald-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Link>
  );
}
