import { db } from "@/lib/db";
import { TASK_STATUS } from "@prisma/client";
import getData from "./get-user-data";

export const getTasks = async () => {
  const user = await getData();

  const tasks = await db.task.findMany({
    where: {
      ownerId: user?.id,
      deleted: false,
      NOT: {
        status: TASK_STATUS.COMPLETED,
      },
    },

    take: 5,
    orderBy: {
      due: "asc",
    },
  });

  return tasks;
};
