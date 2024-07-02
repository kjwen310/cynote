'use client';

import { useRouter } from 'next/navigation';

import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { deleteWorkspace } from '@/actions/workspace/delete-workspace';

import Loading from '@/components/shared-ui/loading';
import { Button } from '@/components/ui/button';
import { DialogModal } from '@/components/shared-ui/dialog-modal';
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
    onFinally: onClose,
  });

  const onConfirm = () => {
    if (!workspace) return;
    execute({ workspaceId: workspace.id });
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
      title="Delete Workspace"
      description={`Are you sure you want to delete ${workspace?.title}`}
      body={modalBody}
      footer={modalFooter}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
