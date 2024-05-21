'use client';

import { ElementRef, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { Layout } from 'lucide-react';
import { updateTaskCard } from '@/actions/task';
import { useToast } from "@/components/ui/use-toast";
import { TaskCardWithTaskList } from '@/types';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

interface HeaderProps {
  card: TaskCardWithTaskList;
}

export const Header = ({ card }: HeaderProps) => {
  const [title, setTitle] = useState(card.title);
  const queryClient = useQueryClient();
  const params = useParams();
  const { toast } = useToast();
  const inputRef = useRef<ElementRef<'input'>>(null);

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit();
  };

  const onSubmit = async (formData: FormData) => {
    const title = formData.get('title') as string;
    const workspaceId = params.workspaceId as string;

    if (title === card.title) return;

    const result = await updateTaskCard({ cardId: card.id, workspaceId, title });
    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        title: "ERROR",
        description: error.message,
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: ["card", card.id]
      });
      setTitle(title);

      toast({
        title: "SUCCESS",
        description: `Rename to ${title}`,
      });
    }
  };

  return (
    <div className="flex items-start gap-x-3 w-full mb-6">
      <Layout className="w-5 h-5 text-neutral-700 mt-1" />
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
