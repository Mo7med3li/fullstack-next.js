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
  title: string | undefined;
}) {
  // Fetch tasks
  const tasksList = tasks || (await getTasks());

  const getStatusConfig = (status: TASK_STATUS) => {
    // Check Status
    switch (status) {
      case TASK_STATUS.COMPLETED:
        return {
          icon: CheckCircle2,
          color: "bg-green-400 text-primary-foreground",
          label: "Completed",
        };
      case TASK_STATUS.STARTED:
        return {
          icon: Clock,
          color: "bg-blue-400 text-secondary-foreground",
          label: "In Progress",
        };
      default:
        return {
          icon: Circle,
          color: "bg-muted text-muted-foreground",
          label: "Pending",
        };
    }
  };

  return (
    <Card className="w-full mx-auto shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          {/* Title */}
          <CardTitle className="text-2xl font-semibold text-foreground">
            {title || "My Tasks"}
          </CardTitle>
          <Button className="gap-2 hover:scale-105 transition-transform">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </div>
        <Separator className="mt-4" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tasks */}
        {tasksList && tasksList.length ? (
          <div className="space-y-4">
            {tasksList.map((singleTask) => {
              const statusConfig = getStatusConfig(singleTask.status);
              const StatusIcon = statusConfig.icon;

              return (
                <Card
                  key={singleTask.id}
                  className="p-4 hover:shadow-md transition-shadow border-l-4 border-l-primary/20"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <StatusIcon className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-card-foreground">
                          {singleTask.name}
                        </h3>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed ml-8">
                        {singleTask.description}
                      </p>

                      {singleTask.due && (
                        <div className="flex items-center gap-2 ml-8">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground italic">
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
