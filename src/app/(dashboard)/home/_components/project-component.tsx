import fetchProjects from "../_api/get-projecrts";
import ProjectCard from "./project-card";
import NewProjectModal from "../../project/[id]/_components/new-project-modal";

const ProjectComponent = async () => {
  // Fetch projects
  const { projects } = await fetchProjects();
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
        {projects.map((project) => (
          <div key={project.id} className="w-1/3 p-3">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      {/* Add new */}
      <NewProjectModal />
    </div>
  );
};
export default ProjectComponent;
