'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Smile } from 'lucide-react';
import { useAction } from '@/hooks/use-action';
import { createWorkspace } from '@/actions/workspace/create-workspace';
import { CreateWorkspaceSchema } from '@/actions/workspace/create-workspace/schema';
import { InputType } from '@/actions/workspace/create-workspace/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/use-modal';
import { useToast } from '@/components/ui/use-toast';
import { DialogModal } from '@/components/dialog-modal';
import { IconPicker } from '@/components/icon-picker';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export const WorkspaceCreateModal = () => {
  const { type, isOpen, onClose } = useModal();
  const modalOpen = type === 'workspaceCreate' && isOpen;

  const router = useRouter();
  const { toast } = useToast();

  const { execute } = useAction(createWorkspace, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Create workspace',
      });
      router.push(`/workspace/${data.id}`);
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
  });

  const onSubmit = (data: InputType) => {
    const { title, description, image } = data;
    execute({ title, description, image });
  };

  const form = useForm({
    resolver: zodResolver(CreateWorkspaceSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
    },
  });

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
    <DialogModal
      title="Create Workspace"
      description="Fill the title and description"
      body={modalBody}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
