"use client";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

const baseClasses =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm";

const iconClassBasses =
  "absolute top-1/2 z-50 mt-[1px] size-[18px] -translate-y-1/2 text-zinc-400 dark:text-zinc-50 cursor-pointer";
function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  // state
  const [hide, setHide] = React.useState(true);

  // Functions
  const toggleType = () => {
    setHide(!hide);
  };

  // Input type password
  if (type === "password") {
    return (
      <div className="relative">
        <input
          type={hide ? "password" : "text"}
          data-slot="input"
          className={cn(baseClasses, "relative ", className)}
          {...props}
        />
        {hide ? (
          <Eye
            className={cn(
              iconClassBasses,
              "end-4",
              props.disabled && "dark:text-zinc-600"
            )}
            onClick={toggleType}
          />
        ) : (
          <EyeOff
            className={cn(
              iconClassBasses,
              "end-4",
              props.disabled && "dark:text-zinc-600"
            )}
            onClick={toggleType}
          />
        )}
      </div>
    );
  }

  return (
    <input type={type} className={cn(baseClasses, className)} {...props} />
  );
}

export { Input };
