"use client";

import clsx from "clsx";
import { Calendar, Grid, Settings, User, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface SidebarLinksProps {
  link: {
    label: string;
    icon: string;
    link: string;
  };
}
const icons: Record<string, LucideIcon> = { Calendar, Grid, Settings, User };
const SidebarLink = ({ link }: SidebarLinksProps) => {
  const pathName = usePathname();
  const isActive = pathName == link.link ? true : false;
  const Icon = icons[link.icon];
  return (
    <Link href={link.link}>
      <Icon
        size={40}
        className={clsx(
          "stroke-gray-400  hover:stroke-zinc-800 transition duration-200 ease-in-out",
          isActive && "stroke-zinc-800"
        )}
      />
    </Link>
  );
};

export default SidebarLink;
