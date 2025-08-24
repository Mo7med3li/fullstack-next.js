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
                <div className="w-1 h-8 bg-zinc-800 rounded-full" />
                <h1 className="text-4xl font-bold text-zinc-800">
                  Welcome back, {user?.firstName}!
                </h1>
              </div>
              <p className="text-lg text-gray-600 max-w-md">
                Ready to tackle your day? Here&apos;s what you have planned.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-full">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-600">
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
