'use client';

import { useParams, useRouter } from 'next/navigation';
import { ClipboardCheck, Edit, FilePenLine, Trash } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WorkspaceWithDetail } from '@/types';
import { Note, ROLE, TaskBoard } from '@prisma/client';
import { useModal, ModalType } from '@/hooks/use-modal';

type ItemType = 'taskBoard' | 'note';

interface WorkspaceSectionItemProps {
  workspace: WorkspaceWithDetail;
  type: ItemType;
  item: TaskBoard | Note;
  role?: ROLE;
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

export const WorkspaceSectionItem = ({
  workspace,
  type,
  item,
  role,
}: WorkspaceSectionItemProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const onEdit = () => {
    router.push(`/workspace/${workspace.id}/${typeMap[type].route}/${item.id}`);
  };

  const onDelete = () => {
    onOpen(typeMap[type].deleteModal as ModalType, {
      [typeMap[type].deletePayloadKey]: item,
    });
  };

  return (
    <button
      onClick={() => {}}
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
      {role === 'OWNER' && (
        <div className="flex items-center gap-x-2 ml-auto">
          <Edit
            className="hidden w-4 h-4 text-zinc-500 transition group-hover:block hover:text-zinc-400 dark:text-zinc-400 dar:hover:text-zinc-300"
            onClick={onEdit}
          />
          <Trash
            className="hidden w-4 h-4 text-zinc-500 transition group-hover:block hover:text-zinc-400 dark:text-zinc-400 dar:hover:text-zinc-300"
            onClick={onDelete}
          />
        </div>
      )}
    </button>
  );
};
