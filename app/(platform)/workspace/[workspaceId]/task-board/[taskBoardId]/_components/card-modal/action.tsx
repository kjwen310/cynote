'use client';

import { useParams } from 'next/navigation';
import { Copy, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TaskCardWithTaskList } from '@/types';
import { copyTaskCard } from '@/actions/task/copy-task-card';
import { deleteTaskCard } from '@/actions/task/delete-task-card';
import { useCardModal } from '@/hooks/use-card-modal';
import { useToast } from '@/components/ui/use-toast';
import { useAction } from '@/hooks/use-action';

interface ActionProps {
  card: TaskCardWithTaskList;
}

export const Action = ({ card }: ActionProps) => {
const { toast } = useToast();
  const params = useParams();
  const { workspaceId, taskBoardId } = params;

  const onClose = useCardModal((state) => state.onClose);

  const { execute: executeCopy } = useAction(copyTaskCard, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: `Copied Card ${data.title}`,
      });
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
    onFinally:  onClose,
  });

  const { execute: executeDelete } = useAction(deleteTaskCard, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: `Deleted Card ${data.title}`,
      });
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
    onFinally:  onClose,
  });

  const onCopy = () => executeCopy({
    taskCardId: card.id,
    workspaceId: workspaceId as string,
    taskBoardId: taskBoardId as string,
  });

  const onDelete = () => executeDelete({
    taskCardId: card.id,
    workspaceId: workspaceId as string,
    taskBoardId: taskBoardId as string,
  });

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start"
        onClick={onCopy}
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start"
        onClick={onDelete}
      >
        <Trash className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Action.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
