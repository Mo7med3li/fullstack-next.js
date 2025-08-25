"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-110"
        >
          <Sun className="h-[1.1rem] w-[1.1rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.1rem] w-[1.1rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-gray-800/95 backdrop-blur-xl border-gray-700/50 text-white"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="hover:bg-blue-600/20 focus:bg-blue-600/20 cursor-pointer transition-colors duration-200"
        >
          <Sun className="h-4 w-4 mr-2 text-yellow-400" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="hover:bg-blue-600/20 focus:bg-blue-600/20 cursor-pointer transition-colors duration-200"
        >
          <Moon className="h-4 w-4 mr-2 text-blue-400" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="hover:bg-blue-600/20 focus:bg-blue-600/20 cursor-pointer transition-colors duration-200"
        >
          <div className="h-4 w-4 mr-2 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-sm" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
