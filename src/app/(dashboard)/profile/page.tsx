import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import getData from "../home/_api/get-user-data";
import { CalendarDays, Mail, User } from "lucide-react";
import formatDate from "@/lib/utils/date-format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  // Variables
  const user = await getData();
  return (
    <div className="h-full space-y-6 overflow-y-auto p-6">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border-0 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-emerald-600/5" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            {/* User Avatar */}
            <Avatar className="h-20 w-20 sm:h-28 sm:w-28 ring-2 ring-blue-500/20 shadow-lg">
              <AvatarFallback className="text-lg sm:text-xl font-semibold bg-gradient-to-br from-blue-500 to-emerald-500 text-white">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            
            {/* User Info */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">
                {user?.firstName} {user?.lastName}
              </h1>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3">
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 dark:text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm sm:text-base">{user?.email}</span>
                </div>
                <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600 dark:text-gray-400">
                  <CalendarDays className="h-4 w-4" />
                  <span className="text-sm">
                    Member since {formatDate(user?.createdAt || new Date())}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Information Card */}
      <Card className="bg-white dark:bg-gray-800 shadow-lg border-0 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-transparent to-blue-600/5" />
        
        <CardHeader className="pb-4 relative z-10">
          <CardTitle className="flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Account Information
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                First Name
              </label>
              <p className="text-gray-800 dark:text-gray-100 font-medium text-lg">
                {user?.firstName}
              </p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Last Name
              </label>
              <p className="text-gray-800 dark:text-gray-100 font-medium text-lg">
                {user?.lastName}
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Email Address
            </label>
            <p className="text-gray-800 dark:text-gray-100 font-medium text-lg">{user?.email}</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
              User ID
            </label>
            <p className="text-xs text-gray-600 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-3 py-2 rounded-lg">
              {user?.id}
            </p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Last Updated
            </label>
            <p className="text-gray-800 dark:text-gray-100">
              {formatDate(user?.updatedAt || new Date())}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
