import { db } from "@/lib/db";
import getData from "./get-user-data";

const fetchSingleProduct = async (id: string) => {
  const user = await getData();

  const project = await db.project.findFirst({
    where: {
      id,
      ownerId: user?.id,
    },
    include: {
      tasks: true,
    },
  });
  return project;
};
export default fetchSingleProduct;
