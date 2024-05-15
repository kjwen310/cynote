'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Smile } from 'lucide-react';
import { createWorkspace } from '@/actions/workspace';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/use-modal';
import { useToast } from '@/components/ui/use-toast';
import { DialogModal } from '../_components/dialog-modal';
import { IconPicker } from './icon-picker';

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
  description: z.string().min(1, { message: 'Description is required' }),
  image: z.string(),
});

export const CreateWorkspace = () => {
  const isOpen = useModal((state) => state.isOpen);
  const onOpen = useModal((state) => state.onOpen);
  const onClose = useModal((state) => state.onClose);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const result = await createWorkspace(data as any);

    const workspaceId = JSON.parse(result);
    onClose();

    if (!workspaceId) {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    } else {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Create workspace',
      });
      router.push(`/workspace/${workspaceId}`);
    }
  };

  const modalBody = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Please fill description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <IconPicker onChange={field.onChange} asChild>
                  <Button type="button" variant="outline">
                    {field.value ? (
                      <p className="w-4 h-4 mr-2">{field.value}</p>
                    ) : (
                      <Smile className="w-4 h-4 mr-2" />
                    )}
                    Pick Icon
                  </Button>
                </IconPicker>
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
      <Button variant="outline" onClick={onOpen}>
        Create Your Workspace
      </Button>
      <DialogModal
        title="Create Workspace"
        description="Fill the title and description"
        body={modalBody}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
