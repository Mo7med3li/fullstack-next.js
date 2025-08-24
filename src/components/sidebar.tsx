"use client";

import LogoutButton from "./logout";
import SidebarLink from "./sidebar-links";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Building2 } from "lucide-react";

const links = [
  { label: "Home", icon: "Home", link: "/home" },
  { label: "Projects", icon: "Grid", link: "/project" },
  { label: "Profile", icon: "User", link: "/profile" },
];

const Sidebar = () => {
  return (
    <Card className="h-full border-sidebar-border bg-sidebar">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-white">
          <Building2 className="h-6 w-6 text-white" />
          <span className="text-lg font-bold text-white">ProjectTask</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 px-4">
        <nav className="space-y-1">
          {links.map((link) => (
            <SidebarLink key={link.link} link={link} />
          ))}
        </nav>
        <div className="mt-auto pt-4">
          <LogoutButton />
        </div>
      </CardContent>
    </Card>
  );
};

export default Sidebar;
