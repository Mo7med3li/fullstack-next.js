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
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-white",
        "hover:bg-sidebar-accent hover:text-zinc-800",
        isActive ? "bg-zinc-800  shadow-sm" : "text-white"
      )}
    >
      <IconComponent className="h-5 w-5" />
      <span className="font-medium">{link.label}</span>
    </Link>
  );
}
