'use client';

import { ElementRef, useRef, useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { cn } from '@/lib/utils';
import { TaskListWithTaskCard } from '@/types';
import { ListHeader } from './list-header';
import { CreateTaskCard } from './create-task-card';
import { CardItem } from './card-item';

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
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[200px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md shadow-md bg-[#f1f2f4] pb-4"
          >
            <ListHeader list={item} onAddCard={enableEditing} />
            <Droppable droppableId={item.id} type="task-card">
              {(provided) => (
                <ol
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={cn(
                    'flex flex-col gap-y-2 mx-1 px-1 py-0.5',
                    item.taskCards.length > 0 ? 'mt-2' : 'mt-0'
                  )}
                >
                  {item.taskCards.map((card, index) => (
                    <CardItem key={card.id} index={index} card={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CreateTaskCard
              ref={textareaRef}
              listId={item.id}
              isEditing={isEditing}
              disableEditing={disableEditing}
              enableEditing={enableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
