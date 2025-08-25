"use client";

import LogoutButton from "./logout";
import SidebarLink from "./sidebar-links";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Building2 } from "lucide-react";
import { ModeToggle } from "./mode-toggle";

const links = [
  { label: "Home", icon: "Home", link: "/home" },
  { label: "Projects", icon: "Grid", link: "/project" },
  { label: "Profile", icon: "User", link: "/profile" },
];

const Sidebar = () => {
  return (
    <Card className="sidebar h-full border-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 shadow-2xl relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-emerald-600/10 dark:from-blue-500/20 dark:via-transparent dark:to-emerald-500/20" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 dark:bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/5 dark:bg-emerald-400/10 rounded-full blur-2xl" />

      <CardHeader className="pb-6 relative z-10">
        <CardTitle className="flex items-center justify-between text-white space-x-3">
          <div className="flex items-center gap-3">
            <div className="relative sidebar-float">
              <Building2 className="h-7 w-7 text-blue-400 dark:text-blue-300" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 dark:bg-emerald-300 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">ProjectTask</span>
              <span className="text-xs text-gray-400 dark:text-gray-300 font-normal">
                Dashboard
              </span>
            </div>
          </div>

          {/* Mode Toggle */}
          <ModeToggle />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-4 relative z-10">
        <nav className="space-y-2">
          {links.map((link) => (
            <SidebarLink key={link.link} link={link} />
          ))}
        </nav>

        {/* Divider */}
        <div className="my-4">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-600 dark:via-gray-500 to-transparent" />
        </div>

        <div className="mt-auto">
          <LogoutButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
