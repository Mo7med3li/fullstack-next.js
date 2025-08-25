import React, { Suspense } from "react";
import Greeting from "./_components/greeting";
import GreetingsSkeleton from "@/lib/skeleton/greeting.skeleton";
import ProjectComponent from "./_components/project-component";
import TasksCard from "./_components/task-card";
import fetchProjects from "./_api/get-projecrts";
import { getTasks } from "./_api/get-tasks";

export default async function page() {
  // Fetch projects and tasks
  const { projects } = await fetchProjects();
  const tasks = await getTasks();

  return (
    <div className="w-full h-full pr-6">
      <div className=" h-full items-stretch justify-center min-h-[content]">
        {/* Greeting component */}
        <div className="flex-1 grow flex">
          <Suspense fallback={<GreetingsSkeleton />}>
            <Greeting />
          </Suspense>
        </div>

        <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3">
          {/* Projects */}
          <ProjectComponent />
        </div>

        <div className="mt-6 flex-2 grow w-full flex">
          <div className="w-full">
            {/* TasksCards  */}
            <TasksCard
              tasks={tasks}
              projectId={projects.length > 0 ? projects[0].id : "general"}
              projectName={
                projects.length > 0 ? projects[0].name : "General Tasks"
              }
              hasProjects={projects.length > 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
