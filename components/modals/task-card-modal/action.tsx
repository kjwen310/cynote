'use client';

import { useParams } from 'next/navigation';
import { Copy, MoreHorizontal, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TaskCardWithTaskList } from '@/types';
import { copyTaskCard } from '@/actions/task/copy-task-card';
import { deleteTaskCard } from '@/actions/task/delete-task-card';
import { useModal } from '@/hooks/use-modal';
import { useToast } from '@/components/ui/use-toast';
import { useAction } from '@/hooks/use-action';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import Loading from '@/components/loading';

interface ActionProps {
  card: TaskCardWithTaskList;
}

export const Action = ({ card }: ActionProps) => {
  const { toast } = useToast();
  const params = useParams();
  const { workspaceId, taskBoardId } = params;

  const { onClose } = useModal();

  const { execute: executeCopy, isLoading: isCopyLoading } = useAction(
    copyTaskCard,
    {
      onSuccess: (data) => {
        toast({
          title: 'SUCCESS',
          description: `Copied Card ${data.title}`,
        });
      },
      onFinally: onClose,
    }
  );

  const { execute: executeDelete, isLoading: isDeleteLoading } = useAction(
    deleteTaskCard,
    {
      onSuccess: (data) => {
        toast({
          title: 'SUCCESS',
          description: `Deleted Card ${data.title}`,
        });
      },
      onFinally: onClose,
    }
  );

  const onCopy = () =>
    executeCopy({
      taskCardId: card.id,
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
    });

  const onDelete = () =>
    executeDelete({
      taskCardId: card.id,
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
    });

  if (isCopyLoading || isDeleteLoading) {
    return <Loading />;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-auto h-auto p-2">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 py-3">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={onCopy}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Card
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={onDelete}
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete Card
        </Button>
      </PopoverContent>
    </Popover>
  );
};
