'use client';

import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { createTaskBoard } from '@/actions/task/create-task-board';
import { InputType } from '@/actions/task/create-task-board/types';
import { CreateTaskBoardSchema } from '@/actions/task/create-task-board/schema';

import Loading from '@/components/shared-ui/loading';
import { DialogModal } from '@/components/shared-ui/dialog-modal';
import { ImagePicker } from '@/components/shared-ui/image-picker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export const TaskBoardCreateModal = () => {
  const { type, isOpen, onClose } = useModal();
  const modalOpen = type === 'taskBoardCreate' && isOpen;

  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();
  const { workspaceId } = params;

  const { execute, isLoading } = useAction(createTaskBoard, {
    onSuccess: ({ id, title }) => {
      toast({
        title: 'SUCCESS',
        description: `Successfully Create task board ${title}`,
      });
      router.push(`/workspace/${workspaceId}/task-board/${id}`);
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
                <ImagePicker onChange={field.onChange} />
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

  if (isLoading) {
    return <Loading />;
  }

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
