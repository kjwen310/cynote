'use client';

import { Plus, Settings } from 'lucide-react';
import { WorkspaceWithDetail } from '@/types';
import { useModal } from '@/hooks/use-modal';

type ActionType = 'create' | 'manage';
type ModalType = 'taskBoardCreate' | 'noteCreate' | 'workspaceCollaborator';

interface SectionHeaderProps {
  workspace: WorkspaceWithDetail;
  currentCollaboratorId?: string;
  actionType?: ActionType;
  modalType: ModalType;
  label: string;
  isOwner: boolean;
  isReachLimit?: boolean;
}

const iconMap = {
  create: <Plus className="w-4 h-4" />,
  manage: <Settings className="w-4 h-4" />,
};

export const SectionHeader = ({
  workspace,
  currentCollaboratorId,
  actionType = 'create',
  modalType,
  label,
  isOwner,
  isReachLimit,
}: SectionHeaderProps) => {
  const { onOpen } = useModal();

  const onClick = () => {
    if (isReachLimit && ['taskBoardCreate', 'noteCreate'].includes(modalType)) {
      onOpen('subscription');
    } else {
      onOpen(modalType, { workspace, currentCollaboratorId });
    }
  };

  return (
    <div className="flex justify-between items-center py-2">
      <div className="text-xs text-zinc-500 font-semibold dark:text-zinc-300">
        {label}
      </div>
      {isOwner && (
        <button
          className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          onClick={onClick}
        >
          {iconMap[actionType]}
        </button>
      )}
    </div>
  );
};
