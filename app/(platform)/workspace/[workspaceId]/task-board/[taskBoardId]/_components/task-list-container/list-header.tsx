'use client';

import { useState, useRef, ElementRef } from 'react';
import { useParams } from 'next/navigation';
import { TaskList } from '@prisma/client';

import { useAction } from '@/hooks/use-action';
import { updateTaskList } from '@/actions/task/update-task-list';

import Loading from '@/components/shared-ui/loading';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ListOption } from './list-option';

interface ListHeaderProps {
  list: TaskList;
}

export const ListHeader = ({ list }: ListHeaderProps) => {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const { toast } = useToast();
  const inputRef = useRef<ElementRef<'input'>>(null);

  const { workspaceId, taskBoardId } = params;

  const { execute, isLoading } = useAction(updateTaskList, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Renamed list',
      });
      setTitle(data.title);
      disableEditing();
    },
  });

  const onSubmit = (data: FormData) => {
    const formTitle = data.get('title') as string;
    if (title === formTitle) {
      disableEditing();
      return;
    }

    execute({
      title: formTitle,
      taskListId: list.id,
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
    });
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-between items-start gap-x-2 text-sm font-semibold pt-2 px-2">
      {isEditing ? (
        <form action={onSubmit} className="w-full bg-transparent">
          <Input
            ref={inputRef}
            name="title"
            onBlur={onBlur}
            defaultValue={title}
            className="text-sm text-[#3F3F3F] bg-transparent font-medium break-words outline-none border-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none dark:text-[#CFCFCF]"
          />
        </form>
      ) : (
        <div
          className="w-full h-7 font-medium border-transparent text-sm px-2 py-1"
          onClick={enableEditing}
        >
          {title}
        </div>
      )}
      <ListOption list={list} />
    </div>
  );
};
