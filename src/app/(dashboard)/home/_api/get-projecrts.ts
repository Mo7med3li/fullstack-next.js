import { db } from "@/lib/db";
import getData from "./get-user-data";

const fetchProjects = async () => {
  // User Data
  const user = await getData();
  const projects = await db.project.findMany({
    where: {
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });

  return { projects };
};
export default fetchProjects;
