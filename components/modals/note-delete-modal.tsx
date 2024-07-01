'use client';

import { useRouter, useParams } from 'next/navigation';
import { useModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { DialogModal } from '@/components/dialog-modal';
import { deleteNote } from '@/actions/note/delete-note';
import { useToast } from '@/components/ui/use-toast';
import Loading from '@/components/loading';

export const NoteDeleteModal = () => {
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'noteDelete' && isOpen;

  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();

  const { note } = data;
  const { workspaceId } = params;

  const { execute, isLoading } = useAction(deleteNote, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: `Successfully delete note ${data.title}`,
      });
      router.push(`/workspace/${workspaceId}`);
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
    onFinally: onClose,
  });

  const onConfirm = () => {
    if (!workspaceId || !note) return;
    execute({ workspaceId: workspaceId as string, noteId: note.id });
  };

  const modalBody = (
    <p className="text-md text-rose-500 font-semibold">
      This Can Not Be Recovered!
    </p>
  );

  const modalFooter = (
    <div className="flex justify-between items-center w-full">
      <Button disabled={isLoading} variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
        Confirm
      </Button>
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <DialogModal
      title="Delete Note"
      description={`Are you sure you want to delete ${note?.title} ?`}
      body={modalBody}
      footer={modalFooter}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
