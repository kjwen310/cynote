'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { HistoryLog } from '@prisma/client';

import { TaskCardWithTaskList } from '@/types';
import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { getTaskCard } from '@/actions/task/get-task-card';
import { getHistoryLogByCard } from '@/actions/historyLog/get-history-log-by-card';

import Loading from '@/components/shared-ui/loading';
import { DialogModal } from '@/components/shared-ui/dialog-modal';

import { Header } from './header';
import { Body } from './body';
import { Action } from './action';
import { Activity } from './activity';

export const TaskCardModal = () => {
  const [cardData, setCardData] = useState<TaskCardWithTaskList | null>(null);
  const [historyLogs, setHistoryLogs] = useState<HistoryLog[]>([]);

  const params = useParams();
  const { type, data, isOpen, onClose } = useModal();

  const { workspaceId, taskBoardId } = params;

  const { taskCard, collaborators = [] } = data;
  const modalOpen = type === 'taskCard' && isOpen;

  const createdByInfo = collaborators.find(
    (d) => d.id === cardData?.createdById
  );
  const assignedToInfo = collaborators.find(
    (d) => d.id === cardData?.assignedToId
  );

  const { execute: executeGetTaskCard, isLoading: isCardLoading } = useAction(
    getTaskCard,
    {
      onSuccess: (data) => {
        setCardData(data);
      },
    }
  );

  const {
    execute: executeGetHistoryLogByCard,
    isLoading: isHistoryLogLoading,
  } = useAction(getHistoryLogByCard, {
    onSuccess: (data) => {
      setHistoryLogs(data);
    },
  });

  useEffect(() => {
    if (!isOpen || !taskCard) return;

    executeGetTaskCard({
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
      taskCardId: taskCard.id,
    });
    executeGetHistoryLogByCard({
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
      taskCardId: taskCard.id,
    });
  }, [isOpen]);

  const modalBody = (
    <div className='space-y-4'>
      <div className="flex justify-between items-start">
        {cardData ? <Header card={cardData} /> : <Header.Skeleton />}
        {cardData && <Action card={cardData} />}
      </div>
      <div>
        {cardData ? (
          <Body
            taskCard={cardData}
            createdByInfo={createdByInfo}
            assignedToInfo={assignedToInfo}
            collaborators={collaborators}
            workspaceId={workspaceId as string}
            taskBoardId={taskBoardId as string}
          />
        ) : (
          <Body.Skeleton />
        )}
      </div>
      <div>
        {historyLogs.length ? (
          <Activity historyLogs={historyLogs} />
        ) : (
          <Activity.Skeleton />
        )}
      </div>
    </div>
  );

  if (isCardLoading || isHistoryLogLoading) {
    return <Loading />;
  }

  return <DialogModal body={modalBody} isOpen={modalOpen} onClose={onClose} />;
};
