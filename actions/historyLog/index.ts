'use server';

import { redirect } from 'next/navigation';
import { db } from '@/lib/db';

export async function fetchAllHistoryLog(data: { workspaceId: string }) {
  const { workspaceId } = data;

  if (!workspaceId) {
    redirect('/select-workspace');
  }

  const historyLogs = await db.historyLog.findMany({
    where: {
      workspaceId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return JSON.stringify(historyLogs);
}
