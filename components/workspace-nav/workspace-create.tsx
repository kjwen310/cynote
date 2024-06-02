'use client';

import { Plus } from 'lucide-react';
import { useModal } from '@/hooks/use-modal';

export const WorkspaceCreate = () => {
  const { onOpen } = useModal();

  return (
    <button
      className="flex items-center group"
      onClick={() => onOpen('workspaceCreate')}
    >
      <div className="flex justify-center items-center w-[48px] h-[48px] rounded-[24px] bg-background overflow-hidden transition-all group-hover:rounded-[16px] dark:bg-neutral-700">
        <Plus
          className="text-indigo-500 transition group-hover:text-indigo-200 dark:group-hover:text-white"
          size={25}
        />
      </div>
    </button>
  );
};
