import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import getData from "../home/_api/get-user-data";
import { CalendarDays, Mail, User } from "lucide-react";
import formatDate from "@/lib/utils/date-format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function ProfilePage() {
  // Variables
  const user = await getData();
  return (
    <div className="h-full bg-background">
      <div className="border-b border-border bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-6">
            {/* User Avatar */}
            <Avatar className="h-20 w-20 ring-2 ring-primary/20">
              <AvatarFallback className="text-xl font-semibold bg-primary/10 text-primary">
                {user?.firstName}
              </AvatarFallback>
            </Avatar>
            {/* User Name */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">
                {user?.firstName}
                {user?.lastName}
              </h1>
              <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                {/* User Email */}
                <Mail className="h-4 w-4" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                {/* Member Since */}
                <CalendarDays className="h-4 w-4" />
                <span>
                  Member since {formatDate(user?.createdAt || new Date())}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-foreground">
                {/* User Information */}
                <User className="h-5 w-5 text-primary" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    First Name
                  </label>
                  <p className="text-foreground font-medium">
                    {user?.firstName}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Last Name
                  </label>
                  <p className="text-foreground font-medium">
                    {user?.lastName}
                  </p>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Email Address
                </label>
                <p className="text-foreground font-medium">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  User ID
                </label>
                <p className="text-xs text-muted-foreground font-mono bg-muted px-2 py-1 rounded">
                  {user?.id}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Last Updated
                </label>
                <p className="text-sm text-foreground">
                  {formatDate(user?.updatedAt || new Date())}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
