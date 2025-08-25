import fetchProjects from "../_api/get-projecrts";
import ProjectCard from "./project-card";
import NewProjectModal from "../../project/[id]/_components/new-project-modal";

const ProjectComponent = async () => {
  // Fetch projects
  const { projects } = await fetchProjects();
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full px-2 sm:px-3">
        {projects.map((project) => (
          <div key={project.id}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
      {/* Add new */}
      <div className="flex justify-center px-2 sm:px-3">
        <NewProjectModal />
      </div>
    </div>
  );
};
export default ProjectComponent;
