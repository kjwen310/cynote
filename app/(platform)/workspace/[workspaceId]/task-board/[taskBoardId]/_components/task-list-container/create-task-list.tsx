'use client';

import { useState, useRef, ElementRef } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAction } from '@/hooks/use-action';
import { createTaskList } from '@/actions/task/create-task-list';
import { CreateTaskListSchema } from '@/actions/task/create-task-list/schema';
import { InputType } from '@/actions/task/create-task-list/types';

import Loading from '@/components/shared-ui/loading';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

export const CreateTaskList = () => {
  const [isEditing, setIsEditing] = useState(false);

  const params = useParams();
  const { toast } = useToast();
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const { workspaceId, taskBoardId } = params;

  const { execute, isLoading } = useAction(createTaskList, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Create list',
      });
      disableEditing();
    },
  });

  const onSubmit = (data: InputType) => {
    const { title } = data;
    execute({
      title,
      workspaceId: workspaceId as string,
      taskBoardId: taskBoardId as string,
    });
  };

  const form = useForm({
    resolver: zodResolver(CreateTaskListSchema),
    defaultValues: {
      title: '',
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
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <li className="shrink-0 h-full w-[200px] select-none">
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef}
            className="w-full rounded-md bg-white space-y-4 shadow-md p-3 dark:bg-zinc-700"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      id="title"
                      placeholder="Enter list title..."
                      className="shadow-sm resize-none outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-1">
              <Button type="submit">Add List</Button>
              <Button variant="ghost" size="sm" onClick={disableEditing}>
                <X className="w-5 h-5" />
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <button
          type="button"
          onClick={enableEditing}
          className="flex items-center font-medium text-sm w-full rounded-md bg-slate-200/80 transition p-3 hover:bg-slate-200/50 dark:bg-zinc-700"
        >
          <Plus className="w-4 h-4 mr-2 text-[#87c0cd]" />
          Add a list
        </button>
      )}
    </li>
  );
};
