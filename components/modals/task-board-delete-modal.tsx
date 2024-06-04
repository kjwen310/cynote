'use client';

import { useRouter, useParams } from 'next/navigation';
import { useModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { DialogModal } from '@/components/dialog-modal';
import { deleteTaskBoard } from '@/actions/task/delete-task-board';
import { useToast } from '@/components/ui/use-toast';

export const TaskBoardDeleteModal = () => {
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'taskBoardDelete' && isOpen;

  const { toast } = useToast();
  const router = useRouter();
  const params = useParams();

  const { taskBoard } = data;
  const { workspaceId } = params;

  const { execute, isLoading } = useAction(deleteTaskBoard, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: `Successfully delete task board ${data.title}`,
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
    if (!workspaceId || !taskBoard) return;
    execute({ workspaceId: workspaceId as string, taskBoardId: taskBoard.id });
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

  return (
    <DialogModal
      title="Delete Task Board"
      description={`Are you sure you want to delete ${taskBoard?.title} ?`}
      body={modalBody}
      footer={modalFooter}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
