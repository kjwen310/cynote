'use client';

import { useState, useRef, ElementRef } from 'react';
import { useParams } from 'next/navigation';
import { AlignLeft } from 'lucide-react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { updateTaskCard } from '@/actions/task/update-task-card';
import { TaskCardWithTaskList } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAction } from '@/hooks/use-action';

interface BodyProps {
  card: TaskCardWithTaskList;
}

export const Body = ({ card }: BodyProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const { toast } = useToast();
  const { workspaceId, taskBoardId } = params;

  const formRef = useRef<ElementRef<'form'>>(null);
  const textareaRef = useRef<ElementRef<'textarea'>>(null);

  const { execute } = useAction(updateTaskCard, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully update card',
      });
      disableEditing();
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
  });

  const onSubmit = (data: FormData) => {
    const description = data.get('description') as string;

    execute({
      description,
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
      taskCardId: card.id,
    });
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="w-5 h-5text-neutral-700" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form ref={formRef} action={onSubmit} className="space-y-2">
            <Textarea
              ref={textareaRef}
              name="description"
              placeholder="Add more description..."
              defaultValue={card.description || undefined}
              className="w-full resize-none mt-2 "
            />
            <div className="flex items-center space-x-2">
              <Button type="submit" size="sm">
                Save
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={disableEditing}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            role="button"
            className="font-medium text-sm bg-neutral-200 rounded-md min-h-[80px] py-3 px-3.5"
            onClick={enableEditing}
          >
            {card.description || 'Add more description...'}
          </div>
        )}
      </div>
    </div>
  );
};

Body.Skeleton = function BodySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="w-6 h-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 bg-neutral-200 mb-1" />
        <Skeleton className="w-full h-6 bg-neutral-200" />
      </div>
    </div>
  );
};
