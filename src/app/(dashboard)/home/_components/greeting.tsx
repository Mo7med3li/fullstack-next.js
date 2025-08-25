import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import getData from "../_api/get-user-data";

const Greeting = async () => {
  // User Data
  const user = await getData();

  return (
    <div className="w-full space-y-6">
      <Card className="relative overflow-hidden bg-transparent border-0 shadow-lg">
        <div className="absolute inset-0" />
        <div className="relative p-8">
          <div className="flex items-start justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-1 h-8 bg-blue-600 rounded-full" />
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                  Welcome back, {user?.firstName}!
                </h1>
              </div>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">
                Ready to tackle your day? Here&apos;s what you have planned.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Greeting;
