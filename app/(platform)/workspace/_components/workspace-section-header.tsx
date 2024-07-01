'use client';

import { Plus, Settings } from 'lucide-react';
import { WorkspaceWithDetail } from '@/types';
import { useModal } from '@/hooks/use-modal';

type ActionType = 'create' | 'manage';
type ModalType = 'taskBoardCreate' | 'noteCreate' | 'workspaceCollaborator';

interface WorkspaceSectionHeaderProps {
  workspace: WorkspaceWithDetail;
  currentCollaboratorId?: string;
  actionType?: ActionType;
  modalType: ModalType;
  label: string;
  isOwner: boolean;
}

const iconMap = {
  create: <Plus className="w-4 h-4" />,
  manage: <Settings className="w-4 h-4" />,
};

export const WorkspaceSectionHeader = ({
  workspace,
  currentCollaboratorId,
  actionType = 'create',
  modalType,
  label,
  isOwner,
}: WorkspaceSectionHeaderProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex justify-between items-center py-2">
      <div className="text-xs text-zinc-500 font-semibold dark:text-zinc-300">
        {label}
      </div>
      {isOwner && (
        <button
          className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          onClick={() => onOpen(modalType, { workspace, currentCollaboratorId })}
        >
          {iconMap[actionType]}
        </button>
      )}
    </div>
  );
};
