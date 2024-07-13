'use client';

import { useRouter, useParams } from 'next/navigation';
import { Note, TaskBoard } from '@prisma/client';
import { Trash } from 'lucide-react';

import { SectionItemType } from '@/types';
import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { deleteNote } from '@/actions/note/delete-note';
import { deleteTaskBoard } from '@/actions/task/delete-task-board';

import { useToast } from '@/components/ui/use-toast';

interface SectionItemDeleteProps {
  item: TaskBoard | Note;
  isOwner: boolean;
  type: SectionItemType;
  currentCollaboratorId?: string;
}

export const SectionItemDelete = ({
  item,
  isOwner,
  type,
  currentCollaboratorId,
}: SectionItemDeleteProps) => {
  const { onOpen, onClose } = useModal();
  const { toast } = useToast();

  const router = useRouter();
  const params = useParams();
  const { workspaceId } = params;

  const { execute: executeDeleteNote, isLoading: isDeleteNoteLoading } =
    useAction(deleteNote, {
      onSuccess: (data) => {
        toast({
          title: 'SUCCESS',
          description: `Successfully delete note ${data.title}`,
        });
        router.push(`/workspace/${workspaceId}`);
      },
      onFinally: onClose,
    });

  const {
    execute: executeDeleteTaskBoard,
    isLoading: isDeleteTaskBoardLoading,
  } = useAction(deleteTaskBoard, {
    onSuccess: (data) => {
      toast({
        title: 'SUCCESS',
        description: `Successfully delete task board ${data.title}`,
      });
      router.push(`/workspace/${workspaceId}`);
    },
    onFinally: onClose,
  });

  const onDeleteNote = () => {
    if (!workspaceId || !item) return;
    executeDeleteNote({
      workspaceId: workspaceId as string,
      noteId: item.id,
    });
  };

  const onDeleteTaskBoard = () => {
    if (!workspaceId || !item) return;
    executeDeleteTaskBoard({
      workspaceId: workspaceId as string,
      taskBoardId: item.id,
    });
  };

  const onDelete = () => {
    const typeMap = {
      note: {
        title: 'Delete Note',
        description: 'Are you sure you want to delete this note?',
        onDelete: onDeleteNote,
      },
      taskBoard: {
        title: 'Delete TaskBoard',
        description: 'Are you sure you want to delete this task-board?',
        onDelete: onDeleteTaskBoard,
      },
    };

    onOpen('confirm', {
      confirm: {
        title: typeMap[type].title,
        description: typeMap[type].description,
        onConfirm: typeMap[type].onDelete,
        isLoading: isDeleteNoteLoading || isDeleteTaskBoardLoading,
      },
    });
  };

  const isNote = (item: TaskBoard | Note): item is Note => {
    return 'authorId' in item;
  };

  if (
    !isOwner &&
    !(
      type === 'note' &&
      isNote(item) &&
      currentCollaboratorId === item.authorId
    )
  ) {
    return null;
  }

  return (
    <Trash
      className="hidden w-4 h-4 text-zinc-500 transition cursor-pointer ml-auto group-hover:block hover:text-zinc-400 dark:text-zinc-400 dark:hover:text-zinc-300"
      onClick={onDelete}
    />
  );
};
