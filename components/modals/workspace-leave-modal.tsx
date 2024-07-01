'use client';

import { useModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { DialogModal } from '@/components/dialog-modal';
import { leaveWorkspace } from '@/actions/workspace/leave-workspace';
import { useToast } from '@/components/ui/use-toast';
import Loading from '@/components/loading';

export const WorkspaceLeaveModal = () => {
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'workspaceLeave' && isOpen;

  const { toast } = useToast();
  const { workspace } = data;

  const { execute, isLoading } = useAction(leaveWorkspace, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: `Successfully leave workspace ${data.title}`,
      });
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
      title="Leave Workspace"
      description={`Are you sure you want to leave ${workspace?.title}`}
      body={modalBody}
      footer={modalFooter}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
