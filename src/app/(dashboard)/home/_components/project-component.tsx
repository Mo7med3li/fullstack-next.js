import Link from "next/link";
import fetchProjects from "../_api/get-projecrts";
import ProjectCard from "./project-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ProjectComponent = async () => {
  // Fetch projects
  const { projects } = await fetchProjects();
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
        {projects.map((project) => (
          <div key={project.id} className="w-1/3 p-3">
            <Link href={`/project/${project.id}`}>
              <ProjectCard project={project} />
            </Link>
          </div>
        ))}
      </div>
      {/* Add new */}
      <Button>
        <Plus />
        Add new Project
      </Button>
    </div>
  );
};
export default ProjectComponent;
