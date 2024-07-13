'use client';

import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';

import { WorkspaceWithDetail } from '@/types';
import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { deleteWorkspace } from '@/actions/workspace/delete-workspace';

import { useToast } from '@/components/ui/use-toast';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface HeaderWorkspaceDeleteProps {
  workspace: WorkspaceWithDetail;
}

export const HeaderWorkspaceDelete = ({
  workspace,
}: HeaderWorkspaceDeleteProps) => {
  const { onOpen, onClose } = useModal();
  const { toast } = useToast();

  const router = useRouter();

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

  const onDeleteWorkspace = () => {
    if (!workspace) return;
    execute({ workspaceId: workspace.id });
  };

  return (
    <DropdownMenuItem
      onClick={() =>
        onOpen('confirm', {
          confirm: {
            title: 'Delete Workspace',
            description: `Are you sure you want to delete ${workspace?.title}`,
            onConfirm: onDeleteWorkspace,
            isLoading,
          },
        })
      }
      className="text-sm px-3 py-2 cursor-pointer text-rose-500"
    >
      Delete Workspace
      <Trash className="w-4 h-4 ml-auto" />
    </DropdownMenuItem>
  );
};
