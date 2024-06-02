'use client';

import { Plus, Settings } from 'lucide-react';
import { WorkspaceWithDetail } from '@/types';
import { ROLE } from '@prisma/client';
import { useModal } from '@/hooks/use-modal';

type ActionType = 'create' | 'manage';
type ModalType = 'taskBoardCreate' | 'noteCreate' | 'workspaceCollaborator';

interface WorkspaceSectionHeaderProps {
  workspace: WorkspaceWithDetail;
  actionType?: ActionType;
  modalType: ModalType;
  role: ROLE;
  label: string;
}

const iconMap = {
  create: <Plus className="w-4 h-4" />,
  manage: <Settings className="w-4 h-4" />,
};

export const WorkspaceSectionHeader = ({
  workspace,
  actionType = 'create',
  modalType,
  role,
  label,
}: WorkspaceSectionHeaderProps) => {
  const { onOpen } = useModal();

  return (
    <div className="flex justify-between items-center py-2">
      <div className="text-xs text-zinc-500 font-semibold dark:text-zinc-300">
        {label}
      </div>
      {role === 'OWNER' && (
        <button
          className="transition text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300"
          onClick={() => onOpen(modalType, { workspace })}
        >
          {iconMap[actionType]}
        </button>
      )}
    </div>
  );
};
