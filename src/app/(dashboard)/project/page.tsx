import React from "react";
import fetchProjects from "../home/_api/get-projecrts";
import Link from "next/link";
import ProjectCard from "../home/_components/project-card";
import NewProjectModal from "./[id]/_components/new-project-modal";

export default async function page() {
  // Fetch projects
  const { projects } = await fetchProjects();
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Projects</h1>
              <p className="text-muted-foreground mt-2">
                Track progress and manage your active projects
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              {projects.length} active projects
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link href={`/project/${project.id}`} key={project.id}>
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>

        <NewProjectModal />
      </div>
    </div>
  );
}
