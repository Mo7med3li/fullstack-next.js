"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, Plus } from "lucide-react";
import { TASK_STATUS } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import NewTaskModal from "@/components/new-task-modal";
import NewProjectModal from "../../project/[id]/_components/new-project-modal";
import DeleteTaskModal from "@/components/delete-task-modal";
import { updateTaskStatus } from "@/lib/api/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function TasksCard({
  tasks,
  title,
  projectId = "general",
  projectName = "General Tasks",
  hasProjects = false,
}: {
  tasks?: Task[];
  title?: string | undefined;
  projectId?: string;
  projectName?: string;
  hasProjects?: boolean;
}) {
  const router = useRouter();
  const [tasksList, setTasksList] = useState<Task[]>(tasks || []);

  // Update tasks when props change (after new task creation)
  useEffect(() => {
    setTasksList(tasks || []);
  }, [tasks]);

  const handleOptimisticDelete = (taskId: string) => {
    // Optimistically remove from UI
    setTasksList(prev => prev.filter(task => task.id !== taskId));
  };

  const handleStatusChange = async (taskId: string, newStatus: TASK_STATUS) => {
    try {
      const currentTask = tasksList.find(task => task.id === taskId);
      
      if (newStatus === TASK_STATUS.COMPLETED) {
        // Show completion toast
        toast.success(`Task "${currentTask?.name}" completed! 🎉`);
        
        // Remove completed task from UI immediately
        setTasksList(prev => prev.filter(task => task.id !== taskId));
        
        // Refresh page to update project progress
        setTimeout(() => {
          router.refresh();
        }, 1000);
      } else {
        // For other status changes, update UI optimistically
        setTasksList(prev => 
          prev.map(task => 
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      }

      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error("Failed to update task status:", error);
      
      // Revert optimistic update on error
      setTasksList(tasks || []);
      toast.error("Failed to update task status. Please try again.");
    }
  };

  const getStatusConfig = (status: TASK_STATUS) => {
    // Check Status
    switch (status) {
      case TASK_STATUS.COMPLETED:
        return {
          icon: CheckCircle2,
          color:
            "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg",
          label: "Completed",
        };
      case TASK_STATUS.STARTED:
        return {
          icon: Clock,
          color:
            "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg",
          label: "In Progress",
        };
      default:
        return {
          icon: Circle,
          color:
            "bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-lg",
          label: "Pending",
        };
    }
  };

  // Check if we have a valid project context
  const hasValidProject =
    hasProjects &&
    projectId &&
    projectId !== "general" &&
    projectName &&
    projectName !== "General Tasks";

  // Check if we're on home page with projects but no specific context
  const isHomeWithProjects = hasProjects && !hasValidProject;

  return (
    <Card className="w-full mx-auto shadow-lg bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 border-0 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-emerald-600/5" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />

      <CardHeader className="pb-4 relative z-10">
        <div className="flex items-center justify-between">
          {/* Title */}
          <CardTitle className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            {title || "My Tasks"}
          </CardTitle>

          {/* Show Create Task only if we have a valid project */}
          {hasValidProject ? (
            <NewTaskModal
              projectId={projectId}
              projectName={projectName}
              trigger={
                <Button className="gap-2 hover:scale-105 transition-transform bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg border-0">
                  <Plus className="h-4 w-4" />
                  Create Task
                </Button>
              }
            />
          ) : isHomeWithProjects ? (
            <Button
              variant="outline"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              View Projects
            </Button>
          ) : (
            <NewProjectModal />
          )}
        </div>
        <Separator className="mt-4 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent" />
      </CardHeader>

      <CardContent className="space-y-4 bg-transparent relative z-10">
        {/* Tasks */}
        {tasksList && tasksList.length ? (
          <div className="space-y-4 ">
            {tasksList.map((singleTask) => {
              const statusConfig = getStatusConfig(singleTask.status);
              const StatusIcon = statusConfig.icon;

              return (
                <Card
                  key={singleTask.id}
                  className="p-4 hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-r from-white/80 to-gray-50/80 dark:from-gray-700/80 dark:to-gray-600/80 hover:scale-[1.02] relative overflow-hidden group"
                >
                  {/* Task card background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl" />
                  <div className="absolute bottom-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-full blur-lg" />

                  <div className="flex items-start justify-between gap-4 relative z-10">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => {
                            const nextStatus = 
                              singleTask.status === TASK_STATUS.NOT_STARTED 
                                ? TASK_STATUS.STARTED 
                                : singleTask.status === TASK_STATUS.STARTED 
                                ? TASK_STATUS.COMPLETED 
                                : TASK_STATUS.NOT_STARTED;
                            handleStatusChange(singleTask.id, nextStatus);
                          }}
                          className="hover:scale-110 transition-transform cursor-pointer"
                        >
                          <StatusIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </button>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                          {singleTask.name}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed ml-8">
                        {singleTask.description}
                      </p>

                      {singleTask.due ? (
                        <div className="flex items-center gap-2 ml-8">
                          <Clock className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                            Due: {new Date(singleTask.due).toLocaleDateString()}
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 ml-8">
                          <Clock className="h-3 w-3 text-gray-500 dark:text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                            Due: {new Date().toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={`${statusConfig.color} text-xs font-medium border-0`}
                      >
                        {statusConfig.label}
                      </Badge>
                      
                      <DeleteTaskModal
                        taskId={singleTask.id}
                        taskName={singleTask.name}
                        onDelete={() => handleOptimisticDelete(singleTask.id)}
                      />
                    </div>
                  </div>

                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-blue-500/20 transition-all duration-300" />
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Circle className="h-8 w-8 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">
              {hasValidProject
                ? "No tasks yet"
                : isHomeWithProjects
                ? "Select a project"
                : "No projects yet"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {hasValidProject
                ? `Get started by creating your first task in ${projectName}`
                : isHomeWithProjects
                ? "Choose a project from above to create tasks"
                : "Get started by creating your first project"}
            </p>

            {hasValidProject ? (
              <NewTaskModal
                projectId={projectId}
                projectName={projectName}
                trigger={
                  <Button className="gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg border-0">
                    <Plus className="h-4 w-4" />
                    Create Your First Task
                  </Button>
                }
              />
            ) : isHomeWithProjects ? (
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Projects are available above
                </p>
                <Button
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  View Projects
                </Button>
              </div>
            ) : (
              <NewProjectModal />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
