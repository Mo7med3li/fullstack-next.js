import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, Plus } from "lucide-react";
import { TASK_STATUS } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { getTasks } from "../_api/get-tasks";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default async function TasksCard({
  tasks,
  title,
}: {
  tasks?: Task[];
  title?: string | undefined;
}) {
  // Fetch tasks
  const tasksList = tasks || (await getTasks());

  const getStatusConfig = (status: TASK_STATUS) => {
    // Check Status
    switch (status) {
      case TASK_STATUS.COMPLETED:
        return {
          icon: CheckCircle2,
          color: "bg-emerald-500 text-white",
          label: "Completed",
        };
      case TASK_STATUS.STARTED:
        return {
          icon: Clock,
          color: "bg-blue-500 text-white",
          label: "In Progress",
        };
      default:
        return {
          icon: Circle,
          color: "bg-gray-400 text-white",
          label: "Pending",
        };
    }
  };

  return (
    <Card className="w-full mx-auto shadow-sm bg-transparent">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          {/* Title */}
          <CardTitle className="text-2xl font-semibold text-foreground">
            {title || "My Tasks"}
          </CardTitle>
          <Button className="gap-2 hover:scale-105 transition-transform bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </div>
        <Separator className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-4 bg-transparent">
        {/* Tasks */}
        {tasksList && tasksList.length ? (
          <div className="space-y-4 ">
            {tasksList.map((singleTask) => {
              const statusConfig = getStatusConfig(singleTask.status);
              const StatusIcon = statusConfig.icon;

              return (
                <Card
                  key={singleTask.id}
                  className="p-4 hover:shadow-md transition-shadow border-l-4 border-l-blue-500/30 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <StatusIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                          {singleTask.name}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed ml-8">
                        {singleTask.description}
                      </p>

                      {singleTask.due && (
                        <div className="flex items-center gap-2 ml-8">
                          <Clock className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                            Due: {new Date(singleTask.due).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <Badge
                      variant="secondary"
                      className={`${statusConfig.color} text-xs font-medium`}
                    >
                      {statusConfig.label}
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <Circle className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">
              No tasks yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Get started by creating your first task
            </p>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Your First Task
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
