'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRef, ElementRef } from 'react';
import { X, Plus } from 'lucide-react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { createTaskCard } from '@/actions/task/create-task-card';
import { CreateTaskCardSchema } from '@/actions/task/create-task-card/schema';
import { InputType } from '@/actions/task/create-task-card/types';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { useAction } from '@/hooks/use-action';

interface CreateTaskCardProps {
  listId: string;
  isEditing: boolean;
  disableEditing: () => void;
  enableEditing: () => void;
}

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useParams } from 'next/navigation';
import Loading from '@/components/loading';

export const CreateTaskCard = ({ listId, isEditing, disableEditing, enableEditing }: CreateTaskCardProps) => {
  const formRef = useRef<ElementRef<'form'>>(null);
  const { toast } = useToast();
  const params = useParams();

  const { workspaceId, taskBoardId } = params;

  const { execute, isLoading } = useAction(createTaskCard, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Create card',
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

  const onSubmit = (data: InputType) => {
    const { title } = data;
    execute({
      title,
      listId,
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
    });
  };

  const form = useForm({
    resolver: zodResolver(CreateTaskCardSchema),
    defaultValues: {
      title: '',
      listId: '',
      workspaceId: '',
      taskBoardId: '',
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isLoading) {
    return <Loading />;
  }

  if (isEditing) {
    return (
      <Form {...form}>
        <form
          ref={formRef}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-0.5 px-1 m-1"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    id="title"
                    placeholder="Enter card title..."
                    className="shadow-sm resize-none outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-1">
            <Button type="submit">Add Card</Button>
            <Button variant="ghost" size="sm" onClick={disableEditing}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return (
    <div className="px-2 pt-2">
      <Button
        size="sm"
        variant="ghost"
        className="w-full h-auto justify-start text-sm text-muted-foreground px-2 py-1"
        onClick={enableEditing}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
};
