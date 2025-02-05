type Task = {
  _id: string;
  title: string;
  description: string;
  expiry: string;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

type TaskNew = {
  title: string;
  description: string;
  expiry: Date;
};

export type { Task, TaskNew };
