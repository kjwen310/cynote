'use client';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { forwardRef } from 'react';
import { X, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { createTaskCard } from '@/actions/task';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';

interface CreateTaskCardProps {
  listId: string;
  isEditing: boolean;
  disableEditing: () => void;
  enableEditing: () => void;
}

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useParams } from 'next/navigation';

const formSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
});

export const CreateTaskCard = forwardRef<
  HTMLTextAreaElement,
  CreateTaskCardProps
>(({ listId, isEditing, disableEditing, enableEditing }, ref) => {
  const { toast } = useToast();
  const params = useParams();

  const { workspaceId } = params;

  const form = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const result = await createTaskCard({
      ...data,
      listId,
      workspaceId,
    } as any);

    const taskCard = JSON.parse(result);
    console.log(JSON.parse(result));

    if (!taskCard) {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    } else {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Create card',
      });
      disableEditing();
    }
  };

  if (isEditing) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 py-0.5 px-1 m-1"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                <Textarea
                  id="title"
                  placeholder="Enter card info..."
                  className="shadow-sm resize-none outline-none ring-0 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  {...field}
                />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-1">
            <Button type="submit">Add Card</Button>
            <Button variant="ghost" size="sm" onClick={disableEditing}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </Form>
    );
  }

  return (
    <div className="px-2 pt-2">
      <Button
        size="sm"
        variant="ghost"
        className="w-full h-auto justify-start text-sm text-muted-foreground px-2 py-1"
        onClick={enableEditing}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add a card
      </Button>
    </div>
  );
});

CreateTaskCard.displayName = 'CreateTaskCard';
