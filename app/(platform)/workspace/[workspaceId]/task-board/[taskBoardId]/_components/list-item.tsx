'use client';

import { ElementRef, useRef, useState } from 'react';
import { TaskListWithTaskCard } from '@/types';
import { ListHeader } from './list-header';
import { CreateTaskCard } from './create-task-card';

interface ListItemProps {
  index: number;
  item: TaskListWithTaskCard;
}

export const ListItem = ({ index, item }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const textareaRef = useRef<ElementRef<'textarea'>>(null);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textareaRef.current?.focus();
    });
  };

  return (
    <li className="shrink-0 h-full w-[200px] select-none">
      <div className="w-full rounded-md shadow-md bg-[#f1f2f4] pb-4">
        <ListHeader list={item} onAddCard={enableEditing} />
        <CreateTaskCard
          ref={textareaRef}
          listId={item.id}
          isEditing={isEditing}
          disableEditing={disableEditing}
          enableEditing={enableEditing}
        />
      </div>
    </li>
  );
};
