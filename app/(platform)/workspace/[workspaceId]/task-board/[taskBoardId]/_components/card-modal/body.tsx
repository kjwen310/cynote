'use client';

import { useState, useRef, ElementRef } from 'react';
import { useParams } from 'next/navigation';
import { AlignLeft } from 'lucide-react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { useQueryClient } from '@tanstack/react-query';
import { updateTaskCard } from '@/actions/task';
import { TaskCardWithTaskList } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface BodyProps {
  card: TaskCardWithTaskList;
}

export const Body = ({ card }: BodyProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();
  const params = useParams();
  const { toast } = useToast();

  const formRef = useRef<ElementRef<'form'>>(null);
  const textareaRef = useRef<ElementRef<'textarea'>>(null);

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

  const onSubmit = async (formData: FormData) => {
    const description = formData.get('description') as string;
    const workspaceId = params.workspaceId as string;

    const result = await updateTaskCard({
      cardId: card.id,
      workspaceId,
      description,
    });
    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        title: 'ERROR',
        description: error.message,
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: ['card', card.id],
      });

      toast({
        title: 'SUCCESS',
        description: 'Update description',
      });

      disableEditing();
    }
  };

  return (
    <div className="flex items-start gap-x-3 w-full">
      <AlignLeft className="w-5 h-5text-neutral-700 mt-0.5" />
      <div className="w-full">
        <p className="font-semibold text-neutral-700 mb-2">Description</p>
        {isEditing ? (
          <form ref={formRef} action={onSubmit} className="space-y-2">
            <Textarea
              ref={textareaRef}
              name="description"
              placeholder="Add more description..."
              defaultValue={card.description || undefined}
              className="w-full mt-2"
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
