'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useRef, ElementRef } from 'react';
import { useParams } from 'next/navigation';
import { useEventListener } from 'usehooks-ts';
import { TaskList } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateTaskList } from '@/actions/task/update-task-list';
import { UpdateTaskListSchema } from '@/actions/task/update-task-list/schema';
import { InputType } from '@/actions/task/update-task-list/types';
import { useAction } from '@/hooks/use-action';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { ListOption } from './list-option';
import Loading from '@/components/loading';

interface ListHeaderProps {
  list: TaskList;
}

export const ListHeader = ({ list }: ListHeaderProps) => {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const { toast } = useToast();
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const { workspaceId, taskBoardId } = params;

  const { execute, isLoading } = useAction(updateTaskList, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Create card',
      });
      setTitle(data.title);
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
    if (title === data.title) {
      disableEditing();
      return;
    }

    execute({
      title: data.title,
      taskListId: list.id,
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
    });
  };

  const form = useForm({
    resolver: zodResolver(UpdateTaskListSchema),
    defaultValues: {
      title: '',
      taskListId: '',
      workspaceId: '',
      taskBoardId: '',
    },
  });

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener('keydown', onKeyDown);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-between items-start gap-x-2 text-sm font-semibold pt-2 px-2">
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef}
            className="w-full rounded-md bg-white space-y-4 shadow-md p-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-7 font-medium text-sm border-transparent transition px-2 py-1 hover:border-input focus:border-input"
                      placeholder="Please fill title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
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
