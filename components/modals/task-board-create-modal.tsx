'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { createTaskBoard } from '@/actions/task/create-task-board';
import { InputType } from '@/actions/task/create-task-board/types';
import { CreateTaskBoardSchema } from '@/actions/task/create-task-board/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/use-modal';
import { useToast } from '@/components/ui/use-toast';
import { DialogModal } from '@/components/dialog-modal';
import { ImagePicker } from '@/components/image-picker';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAction } from '@/hooks/use-action';

export const TaskBoardCreateModal = () => {
  const { type, isOpen, onClose } = useModal();
  const modalOpen = type === "taskBoardCreate" && isOpen;

  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const { workspaceId } = params;

  const { execute } = useAction(createTaskBoard, {
    onSuccess: ({ id, title }) => {
      toast({
        title: 'SUCCESS',
        description: `Successfully Create task board ${title}`,
      });
      router.push(`/workspace/${workspaceId}/task-board/${id}`);
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: `Something went wrong: ${error}`,
      });
    },
    onFinally: onClose,
  });

  const onSubmit = (data: InputType) => {
    const { title, image } = data;
    execute({ title, image, workspaceId: workspaceId as string });
  };

  const form = useForm({
    resolver: zodResolver(CreateTaskBoardSchema),
    defaultValues: {
      title: '',
      image: '',
      workspaceId: '',
    },
  });

  const modalBody = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ImagePicker id="image" onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Please fill title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-auto h-8 rounded-sm px-2 py-1.5 md:block"
        >
          Create
        </Button>
      </form>
    </Form>
  );

  return (
    <DialogModal
      title="Create TaskBoard"
      description="Choose cover image and set title"
      body={modalBody}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
