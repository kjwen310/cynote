'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAction } from '@/hooks/use-action';
import { createNote } from '@/actions/note/create-note';
import { CreateNoteSchema } from '@/actions/note/create-note/schema';
import { InputType } from '@/actions/note/create-note/types';
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
import Loading from '@/components/loading';

export const NoteCreateModal = () => {
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'noteCreate' && isOpen;

  const router = useRouter();
  const { toast } = useToast();
  const { workspace } = data;

  const { execute, isLoading } = useAction(createNote, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Create note',
      });
      // Need to find other solutions
      location.href = `/workspace/${workspace?.id}/note/${data.id}`;
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
    onFinally: onClose,
  });

  const onSubmit = (data: InputType) => {
    if (!workspace) return;
    const { title, image } = data;

    execute({ workspaceId: workspace.id, title, image });
  };

  const form = useForm({
    resolver: zodResolver(CreateNoteSchema),
    defaultValues: {
      workspaceId: workspace?.id || '',
      title: '',
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

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DialogModal
      title="Create Note"
      description="Choose cover image and set title"
      body={modalBody}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
