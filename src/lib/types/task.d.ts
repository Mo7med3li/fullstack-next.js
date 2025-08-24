declare type Task = {
  id: string;
  name: string;
  description: string | null;
  status: TASK_STATUS;
  due: Date | null;
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  projectId: string;
  deleted: boolean;
};
