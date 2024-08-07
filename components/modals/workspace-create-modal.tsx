'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { createWorkspace } from '@/actions/workspace/create-workspace';
import { CreateWorkspaceSchema } from '@/actions/workspace/create-workspace/schema';
import { InputType } from '@/actions/workspace/create-workspace/types';

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

export const WorkspaceCreateModal = () => {
  const { type, isOpen, onClose } = useModal();
  const modalOpen = type === 'workspaceCreate' && isOpen;

  const router = useRouter();
  const { toast } = useToast();

  const { execute, isLoading } = useAction(createWorkspace, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Create workspace',
      });
      router.push(`/workspace/${data.id}`);
    },
    onFinally: onClose,
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
        <Button type="submit" className="w-full">
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
      title="Create Workspace"
      description="Choose cover image and set infos"
      body={modalBody}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
