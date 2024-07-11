'use client';

import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { updateTaskBoardCover } from '@/actions/task/update-task-board-cover';
import { UpdateTaskBoardCoverSchema } from '@/actions/task/update-task-board-cover/schema';
import { InputType } from '@/actions/task/update-task-board-cover/types';

import Loading from '@/components/shared-ui/loading';
import { DialogModal } from '@/components/shared-ui/dialog-modal';
import { ImagePicker } from '@/components/shared-ui/image-picker';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

export const TaskBoardUpdateCoverModal = () => {
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'taskBoardUpdateCover' && isOpen;

  const params = useParams();
  const { toast } = useToast();
  const { taskBoard } = data;

  const { execute, isLoading } = useAction(updateTaskBoardCover, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Update task board cover',
      });
    },
    onFinally: onClose,
  });

  const onSubmit = (data: InputType) => {
    if (!taskBoard) return;
    const { image } = data;

    execute({
      workspaceId: params.workspaceId as string,
      taskBoardId: taskBoard.id,
      image,
    });
  };

  const form = useForm({
    resolver: zodResolver(UpdateTaskBoardCoverSchema),
    defaultValues: {
      workspaceId: (params?.workspaceId as string) || '',
      taskBoardId: taskBoard?.id || '',
      image: '',
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
        <Button
          type="submit"
          className="w-auto h-8 rounded-sm px-2 py-1.5 md:block"
        >
          Change
        </Button>
      </form>
    </Form>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DialogModal
      title="Change Task Board Cover"
      description="Choose cover image to change"
      body={modalBody}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
