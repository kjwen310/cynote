import { HistoryLog, LOG_ACTION } from '@prisma/client';

export const genLogMessage = (historyLog: HistoryLog) => {
  const { title, action, type } = historyLog;

  switch (action) {
    case LOG_ACTION.CREATE:
      return `created ${type} ${title}`;
    case LOG_ACTION.UPDATE:
      return `updated ${type} ${title}`;
    case LOG_ACTION.DELETE:
      return `deleted ${type} ${title}`;
    default:
      return `unknown action`;
  }
};
