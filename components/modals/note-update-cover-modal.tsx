'use client';

import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useAction } from '@/hooks/use-action';
import { updateNoteCover } from '@/actions/note/update-note-cover';
import { UpdateNoteCoverSchema } from '@/actions/note/update-note-cover/schema';
import { InputType } from '@/actions/note/update-note-cover/types';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';
import { useToast } from '@/components/ui/use-toast';
import { DialogModal } from '@/components/shared-ui/dialog-modal';
import { ImagePicker } from '@/components/shared-ui/image-picker';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import Loading from '@/components/shared-ui/loading';

export const NoteUpdateCoverModal = () => {
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'noteUpdateCover' && isOpen;

  const params = useParams();
  const { toast } = useToast();
  const { note } = data;

  const { execute, isLoading } = useAction(updateNoteCover, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Update note cover',
      });
    },
    onFinally: onClose,
  });

  const onSubmit = (data: InputType) => {
    if (!note) return;
    const { image } = data;

    execute({ workspaceId: params.workspaceId as string, noteId: note.id, image });
  };

  const form = useForm({
    resolver: zodResolver(UpdateNoteCoverSchema),
    defaultValues: {
      workspaceId: params?.workspaceId as string || '',
      noteId: note?.id || "",
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
      title="Change Note Cover"
      description="Choose cover image to change"
      body={modalBody}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
