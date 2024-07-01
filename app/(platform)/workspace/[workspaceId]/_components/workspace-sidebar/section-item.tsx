'use client';

import { useParams, useRouter } from 'next/navigation';
import { ClipboardCheck, FilePenLine, Trash } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Note, TaskBoard } from '@prisma/client';
import { WorkspaceWithDetail } from '@/types';
import { useModal, ModalType } from '@/hooks/use-modal';

type ItemType = 'taskBoard' | 'note';

interface SectionItemProps {
  workspace: WorkspaceWithDetail;
  currentCollaboratorId?: string;
  type: ItemType;
  item: TaskBoard | Note;
  isOwner: boolean;
}

const typeMap = {
  taskBoard: {
    param: 'taskBoardId',
    route: 'task-board',
    deleteModal: 'taskBoardDelete',
    deletePayloadKey: 'taskBoard',
    icon: (
      <ClipboardCheck className="w-4 h-4 flex-shrink-0 text-zinc-500 dark:text-zinc-300" />
    ),
  },
  note: {
    param: 'noteId',
    route: 'note',
    deleteModal: 'noteDelete',
    deletePayloadKey: 'note',
    icon: (
      <FilePenLine className="w-4 h-4 flex-shrink-0 text-zinc-500 dark:text-zinc-300" />
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
  const router = useRouter();
  const { onOpen } = useModal();

  const onView = () => {
    // Need to find other solutions
    location.href = `/workspace/${workspace.id}/${typeMap[type].route}/${item.id}`;
  };

  const onDelete = () => {
    onOpen(typeMap[type].deleteModal as ModalType, {
      [typeMap[type].deletePayloadKey]: item,
    });
  };

  const isNote = (item: TaskBoard | Note): item is Note => {
    return 'authorId' in item;
  };

  return (
    <button
      onClick={onView}
      className={cn(
        'group w-full flex items-center gap-x-2 rounded-md transition p-2 mb-1 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50',
        params[typeMap[type].param] === item.id &&
          'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      {typeMap[type].icon}
      <div
        className={cn(
          'text-sm text-zinc-500 font-semibold line-clamp-1 transition group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300',
          params[typeMap[type].param] === item.id &&
            'text-primary dark:text-zinc-200 dark:group-hover:text-white'
        )}
      >
        {item.title}
      </div>
      {(isOwner ||
        (type === 'note' &&
          isNote(item) &&
          currentCollaboratorId === item.authorId)) && (
        <Trash
          className="hidden w-4 h-4 text-zinc-500 transition group-hover:block ml-auto hover:text-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-300"
          onClick={onDelete}
        />
      )}
    </button>
  );
};
