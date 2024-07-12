'use client';

import { useState, useRef, ElementRef } from 'react';
import { Collaborator } from '@prisma/client';
import { AlignLeft } from 'lucide-react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { updateTaskCard } from '@/actions/task/update-task-card';
import { TaskCardWithTaskList } from '@/types';
import { useAction } from '@/hooks/use-action';

import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { CreateAssignBlock } from './create-assign-block';

interface BodyProps {
  taskCard: TaskCardWithTaskList;
  createdByInfo: Collaborator | undefined;
  assignedToInfo: Collaborator | undefined;
  collaborators: Collaborator[];
  workspaceId: string;
  taskBoardId: string;
}

export const Body = ({
  taskCard,
  createdByInfo,
  assignedToInfo,
  collaborators,
  workspaceId,
  taskBoardId,
}: BodyProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const formRef = useRef<ElementRef<'form'>>(null);
  const textareaRef = useRef<ElementRef<'textarea'>>(null);

  const { execute } = useAction(updateTaskCard, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully update card',
      });
      disableEditing();
    },
  });

  const onSubmit = (data: FormData) => {
    const description = data.get('description') as string;

    execute({
      description,
      workspaceId,
      taskBoardId,
      taskCardId: taskCard.id,
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
      <AlignLeft className="w-5 h-5 text-neutral-700" />
      <div className="flex flex-col gap-3 w-full md:flex-row">
        <div className="w-full flex-auto">
          <p className="font-semibold text-neutral-700 mb-2 dark:text-zinc-300">
            Description
          </p>
          {isEditing ? (
            <form ref={formRef} action={onSubmit} className="space-y-2">
              <Textarea
                ref={textareaRef}
                name="description"
                placeholder="Add more description..."
                defaultValue={taskCard.description || undefined}
                className="w-full resize-none mt-2 dark:text-zinc-300 dark:bg-zinc-700"
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
              className="font-medium text-sm bg-neutral-200 rounded-md min-h-[80px] py-3 px-3.5 dark:text-zinc-300 dark:bg-zinc-700"
              onClick={enableEditing}
            >
              {taskCard.description || 'Add more description...'}
            </div>
          )}
        </div>
        <CreateAssignBlock
          createdByInfo={createdByInfo}
          assignedToInfo={assignedToInfo}
          taskCard={taskCard}
          collaborators={collaborators}
          workspaceId={workspaceId}
          taskBoardId={taskBoardId}
        />
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
