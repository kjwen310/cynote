'use client';

import { Collaborator, TaskCard } from '@prisma/client';

import { useAction } from '@/hooks/use-action';
import { updateTaskCardAssign } from '@/actions/task/update-task-card-assign';

import Loading from '@/components/shared-ui/loading';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { CollaboratorPopover } from './collaborator-popover';

interface CreateAssignBlockProps {
  createdByInfo: Collaborator | undefined;
  assignedToInfo: Collaborator | undefined;
  taskCard: TaskCard | undefined;
  collaborators: Collaborator[];
  workspaceId: string;
  taskBoardId: string;
}

export const CreateAssignBlock = ({
  createdByInfo,
  assignedToInfo,
  taskCard,
  collaborators,
  workspaceId,
  taskBoardId,
}: CreateAssignBlockProps) => {
  const { toast } = useToast();

  const { execute, isLoading } = useAction(updateTaskCardAssign, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully update assign',
      });
    },
  });

  const onAssignTo = (assignedToId: string) => {
    if (!taskCard || assignedToId === taskCard.assignedToId) return;

    execute({
      workspaceId,
      taskBoardId,
      taskCardId: taskCard.id,
      assignedToId,
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex gap-2 mt-1 md:flex-col md:w-[180px]">
      <div className="flex gap-2 md:flex-col">
        <p className="text-sm text-neutral-400">Created By</p>
        <div className="flex items-center gap-x-2">
          <Avatar className="w-6 h-6 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
            <AvatarImage src={createdByInfo?.displayImage || ''} />
            <AvatarFallback>{createdByInfo?.displayName}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <div className="flex gap-2 md:flex-col">
        <p className="text-sm text-neutral-400">Assigned To</p>
        <div className="flex items-center gap-x-2">
          <Avatar className="w-6 h-6 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
            <AvatarImage src={assignedToInfo?.displayImage || ''} />
            <AvatarFallback>{assignedToInfo?.displayName}</AvatarFallback>
          </Avatar>
          <CollaboratorPopover
            collaborators={collaborators}
            onClick={onAssignTo}
          />
        </div>
      </div>
    </div>
  );
};
