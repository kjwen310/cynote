'use client';

import { ElementRef, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { Layout } from 'lucide-react';
import { updateTaskCard } from '@/actions/task/update-task-card';
import { useToast } from "@/components/ui/use-toast";
import { TaskCardWithTaskList } from '@/types';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useAction } from '@/hooks/use-action';
import Loading from '@/components/loading';

interface HeaderProps {
  card: TaskCardWithTaskList;
}

export const Header = ({ card }: HeaderProps) => {
  const [title, setTitle] = useState(card.title);
  const params = useParams();
  const { toast } = useToast();
  const inputRef = useRef<ElementRef<'input'>>(null);

  const { workspaceId, taskBoardId } = params;

  const { execute, isLoading } = useAction(updateTaskCard, {
    onSuccess: (data) => {
      toast({
        title: "SUCCESS",
        description: `Rename to ${data.title}`,
      });
      setTitle(data.title);
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const formTitle = data.get('title') as string;
    if (title === formTitle) return;
  
    execute({
      title: formTitle,
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
      taskCardId: card.id,
    });
  };

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex items-start gap-x-3 w-full mb-6">
      <Layout className="w-5 h-5 text-neutral-700 mt-2.5" />
      <div className="w-full">
        <form action={onSubmit}>
          <Input
            ref={inputRef}
            name="title"
            onBlur={onBlur}
            defaultValue={title}
            className="relative -left-1.5 w-[95%] border-transparent bg-transparent font-semibold text-xl text-neutral-700 focus-visible:bg-white focus-visible:border-input truncate px-1 mb-0.5"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{card.taskList.title}</span>
        </p>
      </div>
    </div>
  );
};

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="flex items-start gap-x-3 mb-6">
      <Skeleton className="w-6 h-6 bg-neutral-200 mt-1" />
      <div>
        <Skeleton className="w-24 h-6 bg-neutral-200 mb-1" />
        <Skeleton className="w-12 h-6 bg-neutral-200" />
      </div>
    </div>
  );
};
