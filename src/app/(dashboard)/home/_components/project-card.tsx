import formatDate from "@/lib/utils/date-format";
import { Prisma, TASK_STATUS } from "@prisma/client";
import { Calendar, CheckCircle2, TrendingUp, Plus } from "lucide-react";
import { FC } from "react";
import NewTaskModal from "@/components/new-task-modal";

export const projectWithTasks = Prisma.validator<Prisma.ProjectDefaultArgs>()({
  include: { tasks: true },
});

type ProjectWithTasks = Prisma.ProjectGetPayload<typeof projectWithTasks>;

const ProjectCard: FC<{ project: ProjectWithTasks }> = ({ project }) => {
  // Variables
  const completedCount = project.tasks.filter(
    (task) => task.status === TASK_STATUS.COMPLETED
  ).length;
  const progress = Math.ceil((completedCount / project.tasks.length) * 100);

  // Generate consistent color based on project ID
  const colorIndex =
    ((project.id.charCodeAt(0) + project.id.charCodeAt(project.id.length - 1)) %
      6) +
    1;
  const colorClass = `project-color-${colorIndex}`;

  return (
    <div
      className={`group relative border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 ${colorClass}`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted rounded-t-xl overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(project.createdAt)}</span>
        </div>

        {/* Quick Create Task Button */}
        <NewTaskModal
          projectId={project.id}
          projectName={project.name}
          trigger={
            <button className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800/50 transition-colors duration-200 group-hover:scale-110">
              <Plus className="h-3.5 w-3.5" />
            </button>
          }
        />
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold transition-colors duration-200 text-gray-800 dark:text-gray-100">
          {project.name}
        </h3>
        {project.description && (
          <p className="text-sm mt-1 line-clamp-2 text-gray-600 dark:text-gray-300">
            {project.description}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {completedCount} of {project.tasks.length} tasks completed
            </span>
          </div>
          <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">{progress || 0}%</span>
          </div>
        </div>

        <div className="relative">
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress || 0}%` }}
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50/30 to-emerald-50/30 dark:from-blue-900/20 dark:to-emerald-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default ProjectCard;
