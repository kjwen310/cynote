'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { HistoryLog } from '@prisma/client';
import { getTaskCard } from '@/actions/task/get-task-card';
import { getHistoryLogByCard } from '@/actions/historyLog/get-history-log-by-card';
import { updateTaskCardAssign } from '@/actions/task/update-task-card-assign';
import { TaskCardWithTaskList } from '@/types';
import { DialogModal } from '@/components/dialog-modal';
import { useToast } from '@/components/ui/use-toast';
import { Header } from './header';
import { Body } from './body';
import { Action } from './action';
import { Activity } from './activity';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

export const TaskCardModal = () => {
  const [cardData, setCardData] = useState<TaskCardWithTaskList | null>(null);
  const [historyLogs, setHistoryLogs] = useState<HistoryLog[]>([]);

  const params = useParams();
  const { toast } = useToast();
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

  const { execute: executeGetTaskCard, isLoading: isGetCardLoading } =
    useAction(getTaskCard, {
      onSuccess: (data) => {
        setCardData(data);
      },
      onError: (error) => {
        toast({
          title: 'ERROR',
          description: 'Something went wrong',
        });
      },
    });

  const {
    execute: executeGetHistoryLogByCard,
    isLoading: isGetHistoryLogLoading,
  } = useAction(getHistoryLogByCard, {
    onSuccess: (data) => {
      setHistoryLogs(data);
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
  });

  const { execute: executeUpdateTaskCardAssign, isLoading: isAssignLoading } =
    useAction(updateTaskCardAssign, {
      onSuccess: () => {
        toast({
          title: 'SUCCESS',
          description: 'Successfully update assign',
        });
      },
      onError: (error) => {
        toast({
          title: 'ERROR',
          description: 'Something went wrong',
        });
      },
    });

  useEffect(() => {
    if (!isOpen) return;

    if (!workspaceId || !taskBoardId || !taskCard) {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
      return;
    }

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

  const onAssignTo = (assignedToId: string) => {
    if (!taskCard || assignedToId === taskCard.assignedToId) return;

    executeUpdateTaskCardAssign({
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
      taskCardId: taskCard.id,
      assignedToId,
    });
  };

  const modalBody = (
    <>
      <div className="flex justify-between items-start">
        {cardData ? <Header card={cardData} /> : <Header.Skeleton />}
        {cardData && <Action card={cardData} />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
        <div className="col-span-3">
          <div className="w-full space-y-6">
            {cardData ? <Body card={cardData} /> : <Body.Skeleton />}
            {historyLogs.length ? (
              <Activity historyLogs={historyLogs} />
            ) : (
              <Activity.Skeleton />
            )}
          </div>
        </div>

        <div className="flex flex-col gap-y-2 w-full mt-1">
          <div>
            <p className="text-sm text-neutral-400 mb-2">Created By</p>
            <div className="flex items-center gap-x-2">
              <Avatar className="w-6 h-6 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
                <AvatarImage src={createdByInfo?.displayImage || ''} />
                <AvatarFallback>{createdByInfo?.displayName}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div>
            <p className="text-sm text-neutral-400 mb-2">Assigned To</p>
            <div className="flex items-center gap-x-2">
              <Avatar className="w-6 h-6 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
                <AvatarImage src={assignedToInfo?.displayImage || ''} />
                <AvatarFallback>{assignedToInfo?.displayName}</AvatarFallback>
              </Avatar>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-auto h-auto outline-none p-1"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  side="bottom"
                  align="start"
                  className="px-0 py-3"
                >
                  <ScrollArea className="max-h-[150px]">
                    {collaborators.map((collaborator) => (
                      <Button
                        key={collaborator.id}
                        variant="ghost"
                        className="w-full h-auto justify-start text-sm p-2 px-5 rounded-none"
                        onClick={() => onAssignTo(collaborator.id)}
                      >
                        <div className="flex items-center gap-x-2">
                          <Avatar className="w-6 h-6 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
                            <AvatarImage
                              src={collaborator.displayImage || ''}
                            />
                            <AvatarFallback>
                              {collaborator.displayName}
                            </AvatarFallback>
                          </Avatar>
                          <p className="text-sm text-muted-foreground font-semibold text-neutral-700">
                            {collaborator.displayName}
                          </p>
                        </div>
                      </Button>
                    ))}
                  </ScrollArea>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return <DialogModal body={modalBody} isOpen={modalOpen} onClose={onClose} />;
};
