'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { RefreshCw } from 'lucide-react';
import { useAction } from '@/hooks/use-action';
import { createWorkspace } from '@/actions/workspace/create-workspace';
import { CreateWorkspaceSchema } from '@/actions/workspace/create-workspace/schema';
import { InputType } from '@/actions/workspace/create-workspace/types';
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

export const WorkspaceSettingModal = () => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'workspaceSetting' && isOpen;
  const { workspace } = data;

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

  const onOpenImagePicker = () => {
    setIsImagePickerOpen(true);
  };

  useEffect(() => {
    if (!workspace) return;
    form.setValue('title', workspace.title);
    form.setValue('description', workspace.description);
    form.setValue('image', workspace.image);
  }, [workspace, form]);

  const modalBody = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  {isImagePickerOpen && (
                    <ImagePicker id="image" onChange={field.onChange} />
                  )}
                  <div className="flex items-center gap-x-2 mt-2">
                    <Input
                      readOnly
                      value={field.value}
                      className="border-0 text-black bg-zinc-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button
                      type="button"
                      size="icon"
                      disabled={isImagePickerOpen}
                      onClick={onOpenImagePicker}
                    >
                      <RefreshCw className="w-3 h-3" />
                    </Button>
                  </div>
                </>
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
        <Button
          type="submit"
          className="w-auto h-8 rounded-sm px-2 py-1.5 md:block"
        >
          Edit
        </Button>
      </form>
    </Form>
  );

  return (
    <DialogModal
      title="Workspace Settings"
      description="View or edit workspace infos"
      body={modalBody}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
