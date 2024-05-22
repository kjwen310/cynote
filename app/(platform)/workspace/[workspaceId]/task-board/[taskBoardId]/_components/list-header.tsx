'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState, useRef, ElementRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useEventListener } from 'usehooks-ts';
import { TaskList } from '@prisma/client';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { updateTaskList } from '@/actions/task';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { ListOption } from './list-option';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
});

interface ListHeaderProps {
  list: TaskList;
  onAddCard: () => void;
}

export const ListHeader = ({ list, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(list.title);
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const formRef = useRef<ElementRef<'form'>>(null);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const { workspaceId, taskBoardId } = params;

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (title === data.title) {
      disableEditing();
      return;
    }

    const result = await updateTaskList({
      ...data,
      workspaceId,
      boardId: taskBoardId,
      taskListId: list.id,
    } as any);

    const taskList = JSON.parse(result);
    console.log(JSON.parse(result));

    if (!taskList) {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    } else {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Update list',
      });
      setTitle(taskList.title);
      disableEditing();
    }
  };

  useEventListener('keydown', onKeyDown);

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
      <ListOption list={list} onAddTaskCard={onAddCard} />
    </div>
  );
};
