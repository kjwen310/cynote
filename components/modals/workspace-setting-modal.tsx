'use client';

import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAction } from '@/hooks/use-action';
import { updateWorkspace } from '@/actions/workspace/update-workspace';
import { UpdateWorkspaceSchema } from '@/actions/workspace/update-workspace/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useModal } from '@/hooks/use-modal';
import { useToast } from '@/components/ui/use-toast';
import { DialogModal } from '@/components/shared-ui/dialog-modal';
import { ImagePicker } from '@/components/shared-ui/image-picker';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Image from 'next/image';
import { InputType } from '@/actions/workspace/update-workspace/types';
import Loading from '@/components/shared-ui/loading';

export const WorkspaceSettingModal = () => {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const { type, data, isOpen, onClose } = useModal();
  const { toast } = useToast();

  const modalOpen = type === 'workspaceSetting' && isOpen;
  const { workspace, isOwner } = data;

  const { execute, isLoading } = useAction(updateWorkspace, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Update workspace',
      });
    },
    onFinally: () => {
      setIsImagePickerOpen(false);
      onClose();
    },
  });

  const onSubmit = (data: InputType) => {
    if (!workspace) return;
    const { title, description, image } = data;

    if (
      title === workspace.title &&
      description === workspace.description &&
      !isImagePickerOpen
    ) {
      return;
    }

    execute({
      workspaceId: workspace.id,
      title,
      description,
      image:
        image ||
        `${workspace.imageId}|${workspace.imageSmUrl}|${workspace.imageLgUrl}`,
    });
  };

  const form = useForm({
    resolver: zodResolver(UpdateWorkspaceSchema),
    defaultValues: {
      workspaceId: workspace?.id || '',
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
                {!isImagePickerOpen && workspace?.imageSmUrl ? (
                  <div
                    className={cn(
                      'relative aspect-video bg-muted group',
                      isOwner && 'cursor-pointer transition  hover:opacity-75'
                    )}
                  >
                    <Image
                      fill
                      src={workspace.imageSmUrl}
                      alt="image"
                      className="rounded-sm object-cover"
                      sizes="(max-width: 768px) 100vw"
                    />
                    {isOwner && (
                      <div className="absolute flex justify-center items-center w-full h-full inset-y-0 bg-black/30">
                        <RefreshCw
                          className="w-8 h-8 text-white"
                          onClick={onOpenImagePicker}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <ImagePicker id="image" onChange={field.onChange} />
                )}
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
                <Input
                  placeholder="Please fill title"
                  disabled={!isOwner}
                  {...field}
                />
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
                <Input
                  placeholder="Please fill description"
                  disabled={!isOwner}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isOwner && (
          <Button
            type="submit"
            className="w-auto h-8 rounded-sm px-2 py-1.5 md:block"
          >
            Edit
          </Button>
        )}
      </form>
    </Form>
  );

  if (isLoading) {
    return <Loading />;
  }

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
