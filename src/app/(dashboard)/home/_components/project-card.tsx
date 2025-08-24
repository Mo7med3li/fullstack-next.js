import formatDate from "@/lib/utils/date-format";
import { Prisma, TASK_STATUS } from "@prisma/client";
import { Calendar, CheckCircle2, TrendingUp } from "lucide-react";
import { FC } from "react";

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

  return (
    // <div className="!px-6 !py-6 hover:scale-105 transition-all ease-in-out duration-200 bg-white rounded-2xl">
    //   <div>
    //     {/* Date */}
    //     <span className="text-sm text-gray-300">
    //       {formatDate(project.createdAt)}
    //     </span>
    //   </div>
    //   <div className="mb-6">
    //     {/* Project Name */}
    //     <span className="text-3xl text-gray-600">{project.name}</span>
    //   </div>
    //   <div className="mb-2">
    //     {/* Completed Count */}
    //     <span className="text-gray-400">
    //       {completedCount}/{project.tasks.length} completed
    //     </span>
    //   </div>
    //   <div>
    //     {/* Progress */}
    //     <div className="w-full h-2 bg-violet-200 rounded-full mb-2">
    //       <div
    //         className={clsx(
    //           "h-full text-center text-xs text-white bg-violet-600 rounded-full"
    //         )}
    //         style={{ width: `${progress}%` }}
    //       ></div>
    //     </div>
    //     {/* Progress Percentage */}
    //     <div className="text-right">
    //       <span className="text-sm text-gray-600 font-semibold">
    //         {progress}%
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <div className="group relative bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50">
      <div className="absolute top-0 left-0 right-0 h-1 bg-muted rounded-t-xl overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(project.createdAt)}</span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors duration-200">
          {project.name}
        </h3>
        {project.description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
            {project.description}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-card-foreground">
              {completedCount} of {project.tasks.length} tasks completed
            </span>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">{progress}%</span>
          </div>
        </div>

        <div className="relative">
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default ProjectCard;
