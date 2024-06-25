'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState, useRef, ElementRef } from 'react';
import { useParams } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { createTaskList } from '@/actions/task/create-task-list';
import { CreateTaskListSchema } from '@/actions/task/create-task-list/schema';
import { InputType } from '@/actions/task/create-task-list/types';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAction } from '@/hooks/use-action';

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

  const { execute } = useAction(createTaskList, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Create list',
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

  return (
    <li className="shrink-0 h-full w-[200px] select-none">
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
          className="flex items-center font-medium text-sm w-full rounded-md bg-slate-200/80 hover:bg-slate-200/50 transition p-3"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add a list
        </button>
      )}
    </li>
  );
};
