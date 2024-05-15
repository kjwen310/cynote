'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter, useParams } from 'next/navigation';
import { createTaskBoard } from '@/actions/task';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/use-modal';
import { useToast } from '@/components/ui/use-toast';
import { DialogModal } from './dialog-modal';
import { ImagePicker } from './image-picker';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
});

export const CreateTaskBoard = () => {
  const isOpen = useModal((state) => state.isOpen);
  const onOpen = useModal((state) => state.onOpen);
  const onClose = useModal((state) => state.onClose);

  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();

  const { workspaceId } = params;

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      image: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {

    const result = await createTaskBoard({...data, workspaceId } as any);

    const taskBoardId = JSON.parse(result);
    onClose();
    console.log(JSON.parse(result))

    if (!taskBoardId) {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    } else {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Create task board',
      });

      router.push(`/workspace/${workspaceId}/task-board/${taskBoardId}`);
    }
  };

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
    <>
      <p onClick={onOpen} className="text-sm">
        Create New Board
      </p>
      <DialogModal
        title="Create TaskBoard"
        description="Choose cover image and set title"
        body={modalBody}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
