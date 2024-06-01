import {
  TaskList,
  TaskCard,
  Workspace,
  Note,
  Collaborator,
  TaskBoard,
  HistoryLog,
} from '@prisma/client';

export type WorkspaceWithDetail = Workspace & {
  collaborators: Collaborator[];
  taskBoards: TaskBoard[];
  notes: Note[];
  historyLogs: HistoryLog[];
};

export type TaskListWithTaskCard = TaskList & { taskCards: TaskCard[] };
export type TaskCardWithTaskList = TaskCard & { taskList: TaskList };
