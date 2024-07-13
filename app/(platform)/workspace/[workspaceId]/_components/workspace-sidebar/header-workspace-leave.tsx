'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

import { WorkspaceWithDetail } from '@/types';
import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { leaveWorkspace } from '@/actions/workspace/leave-workspace';

import { useToast } from '@/components/ui/use-toast';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface HeaderWorkspaceLeaveProps {
  workspace: WorkspaceWithDetail;
}

export const HeaderWorkspaceLeave = ({
  workspace,
}: HeaderWorkspaceLeaveProps) => {
  const { onOpen, onClose } = useModal();
  const { toast } = useToast();

  const router = useRouter();

  const { execute, isLoading } = useAction(leaveWorkspace, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: `Successfully leave workspace ${data.title}`,
      });
      router.push('/workspace');
    },
    onFinally: onClose,
  });

  const onLeaveWorkspace = () => {
    if (!workspace) return;
    execute({ workspaceId: workspace.id });
  };

  return (
    <DropdownMenuItem
      onClick={() =>
        onOpen('confirm', {
          confirm: {
            title: 'Leave Workspace',
            description: `Are you sure you want to leave ${workspace?.title}`,
            onConfirm: onLeaveWorkspace,
            isLoading,
          },
        })
      }
      className="text-sm px-3 py-2 cursor-pointer text-rose-500"
    >
      Leave Workspace
      <LogOut className="w-4 h-4 ml-auto" />
    </DropdownMenuItem>
  );
};