'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useState, useRef, ElementRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { createTaskList } from '@/actions/task';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ListWrapper } from './list-wrapper';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
});

export const CreateTaskList = () => {
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
      disableEditing();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const result = await createTaskList({
      ...data,
      workspaceId,
      boardId: taskBoardId,
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
        description: 'Successfully Create list',
      });
      disableEditing();
      router.refresh();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  return (
    <ListWrapper>
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
    </ListWrapper>
  );
};
