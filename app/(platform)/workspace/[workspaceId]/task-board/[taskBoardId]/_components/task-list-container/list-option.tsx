'use client';

import { useParams } from 'next/navigation';
import { Copy, MoreHorizontal, Trash } from 'lucide-react';
import { TaskList } from '@prisma/client';

import { useAction } from '@/hooks/use-action';
import { deleteTaskList } from '@/actions/task/delete-task-list';
import { copyTaskList } from '@/actions/task/copy-task-list';

import Loading from '@/components/shared-ui/loading';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface ListOptionProps {
  list: TaskList;
}

export const ListOption = ({ list }: ListOptionProps) => {
  const params = useParams();
  const { toast } = useToast();
  const { workspaceId, taskBoardId } = params;

  const { execute: executeDelete, isLoading: isDeleteLoading } = useAction(
    deleteTaskList,
    {
      onSuccess: (data) => {
        toast({
          title: 'SUCCESS',
          description: `Successfully delete list ${data.title}`,
        });
      },
    }
  );

  const { execute: executeCopy, isLoading: isCopyLoading } = useAction(
    copyTaskList,
    {
      onSuccess: (data) => {
        toast({
          title: 'SUCCESS',
          description: `Successfully copy list ${data.title}`,
        });
      },
    }
  );

  const onDelete = () =>
    executeDelete({
      taskListId: list.id,
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
    });

  const onCopy = () =>
    executeCopy({
      taskListId: list.id,
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
    });

  if (isDeleteLoading || isCopyLoading) {
    return <Loading />;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-auto h-auto p-2">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="max-w-[160px] px-0 py-2">
        <Button
          variant="ghost"
          className="w-full h-auto justify-start text-sm p-2 px-5 rounded-none"
          onClick={onCopy}
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy List
        </Button>
        <Button
          variant="ghost"
          className="w-full h-auto justify-start text-sm p-2 px-5 rounded-none"
          onClick={onDelete}
        >
          <Trash className="w-4 h-4 mr-2" />
          Delete List
        </Button>
      </PopoverContent>
    </Popover>
  );
};
