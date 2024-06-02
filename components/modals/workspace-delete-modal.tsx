'use client';

import { useRouter } from 'next/navigation';
import { useModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { DialogModal } from '@/components/dialog-modal';
import { deleteWorkspace } from '@/actions/workspace/delete-workspace';
import { useToast } from '@/components/ui/use-toast';

export const WorkspaceDeleteModal = () => {
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'workspaceDelete' && isOpen;

  const router = useRouter();
  const { toast } = useToast();
  const { workspace } = data;

  const { execute, isLoading } = useAction(deleteWorkspace, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: `Successfully delete workspace ${data.title}`,
      });
      router.push('/workspace');
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
    if (!workspace) return;
    execute({ workspaceId: workspace.id });
  }

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

  return (
    <DialogModal
      title="Delete Workspace"
      description={`Are you sure you want to delete ${workspace?.title}`}
      body={modalBody}
      footer={modalFooter}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
