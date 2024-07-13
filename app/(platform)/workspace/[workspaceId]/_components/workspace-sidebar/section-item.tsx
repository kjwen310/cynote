'use client';

import { useParams } from 'next/navigation';
import { ClipboardCheck, FilePenLine } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Note, TaskBoard } from '@prisma/client';
import { WorkspaceWithDetail, SectionItemType } from '@/types';
import { SectionItemDelete } from './section-item-delete';

interface SectionItemProps {
  workspace: WorkspaceWithDetail;
  currentCollaboratorId?: string;
  type: SectionItemType;
  item: TaskBoard | Note;
  isOwner: boolean;
}

const typeMap = {
  note: {
    param: 'noteId',
    route: 'note',
    icon: (
      <FilePenLine className="w-4 h-4 flex-shrink-0 text-zinc-500 dark:text-zinc-300" />
    ),
  },
  taskBoard: {
    param: 'taskBoardId',
    route: 'task-board',
    icon: (
      <ClipboardCheck className="w-4 h-4 flex-shrink-0 text-zinc-500 dark:text-zinc-300" />
    ),
  },
};

export const SectionItem = ({
  workspace,
  currentCollaboratorId,
  type,
  item,
  isOwner,
}: SectionItemProps) => {
  const params = useParams();

  const onView = () => {
    // Need to find other solutions
    location.href = `/workspace/${workspace.id}/${typeMap[type].route}/${item.id}`;
  };

  return (
    <div
      className={cn(
        'group w-full flex items-center gap-x-2 rounded-md transition p-2 mb-1 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
        params[typeMap[type].param] === item.id &&
          'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      {typeMap[type].icon}
      <button
        onClick={onView}
        className={cn(
          'flex-1 text-left text-sm text-zinc-500 font-semibold line-clamp-1 transition truncate group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300',
          params[typeMap[type].param] === item.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {item.title}
      </button>
      <SectionItemDelete
        isOwner={isOwner}
        currentCollaboratorId={currentCollaboratorId}
        item={item}
        type={type}
      />
    </div>
  );
};
