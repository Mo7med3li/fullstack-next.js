import React from "react";
import fetchSingleProduct from "../../home/_api/get-single-project";
import TasksCard from "../../home/_components/task-card";

export default async function page({ params }: { params: { id: string } }) {
  const project = await fetchSingleProduct(params.id);
  return (
    <div className="h-full pr-6 w-1/1">
      <TasksCard
        tasks={project?.tasks}
        title={project?.name}
        projectId={params.id}
        projectName={project?.name}
        hasProjects={true}
      />
    </div>
  );
}
