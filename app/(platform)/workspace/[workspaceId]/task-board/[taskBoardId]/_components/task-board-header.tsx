'use client';

import { useState, useRef, ElementRef } from 'react';
import { useParams } from 'next/navigation';
import { TaskBoard } from '@prisma/client';

import { useAction } from '@/hooks/use-action';
import { updateTaskBoardTitle } from '@/actions/task/update-task-board-title';

import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import Loading from '@/components/shared-ui/loading';

interface TaskBoardHeaderProps {
  taskBoard: TaskBoard;
}

export const TaskBoardHeader = ({ taskBoard }: TaskBoardHeaderProps) => {
  const [title, setTitle] = useState(taskBoard.title);
  const { toast } = useToast();
  const inputRef = useRef<ElementRef<'input'>>(null);

  const params = useParams();
  const { workspaceId } = params;

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const { execute, isLoading } = useAction(updateTaskBoardTitle, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Update title',
      });
      setTitle(data.title);
    },
  });

  const onSubmit = (data: FormData) => {
    const formTitle = data.get('title') as string;
    if (title === formTitle) return;

    execute({
      workspaceId: workspaceId as string,
      taskBoardId: taskBoard.id,
      title: formTitle,
    });
  };

  return (
    <>
      {isLoading && <Loading />}
      <form action={onSubmit} className="w-full bg-transparent my-8">
        <Input
          ref={inputRef}
          name="title"
          onBlur={onBlur}
          defaultValue={title}
          className="text-5xl text-[#3F3F3F] bg-transparent font-bold break-words outline-none border-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-none dark:text-[#CFCFCF]"
        />
      </form>
    </>
  );
};

TaskBoardHeader.Skeleton = function TaskBoardHeaderSkeleton() {
  return <Skeleton className="w-24 h-6 bg-neutral-200" />;
};
