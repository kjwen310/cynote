'use client';

import { useParams } from 'next/navigation';
import { HistoryLog } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useModal } from '@/hooks/use-modal';
import { TaskCardWithTaskList } from '@/types';
import { fetcher } from '@/lib/fetcher';
import { DialogModal } from '@/components/dialog-modal';
import { Header } from './header';
import { Body } from './body';
import { Action } from './action';
import { Activity } from './activity';

export const TaskCardModal = () => {
  const { type, isOpen, onClose } = useModal();
  const modalOpen = type === "taskCard" && isOpen;

  const params = useParams();
  const { workspaceId } = params;

  const { data: cardData } = useQuery<TaskCardWithTaskList>({
    queryKey: ['card', workspaceId],
    queryFn: () => fetcher(`/api/card/${workspaceId}/${workspaceId}`),
  });

  const { data: historyData } = useQuery<HistoryLog[]>({
    queryKey: ['task-log', workspaceId],
    queryFn: () => fetcher(`/api/card/${workspaceId}/logs`),
  });

  const modalBody = (
    <>
    {cardData ? <Header card={cardData} /> : <Header.Skeleton />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? <Body card={cardData} /> : <Body.Skeleton />}
              {historyData ? <Activity historyLogs={historyData} /> : <Activity.Skeleton />}
            </div>
          </div>
          {cardData ? <Action card={cardData} /> : <Action.Skeleton />}
        </div>
    </>
  )

  return (
    <DialogModal
      body={modalBody}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
