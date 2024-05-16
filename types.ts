import { TaskList, TaskCard } from "@prisma/client";

export type TaskListWithTaskCard = TaskList & { taskCards: TaskCard[] };