'use client';

import { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { Collaborator } from '@prisma/client';

import { cn } from '@/lib/utils';
import { TaskListWithTaskCard } from '@/types';

import { ListHeader } from './list-header';
import { CardItem } from './card-item';
import { CreateTaskCard } from './create-task-card';

interface ListItemProps {
  index: number;
  item: TaskListWithTaskCard;
  collaborators: Collaborator[];
}

export const ListItem = ({ index, item, collaborators }: ListItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const disableEditing = () => {
    setIsEditing(false);
  };

  const enableEditing = () => {
    setIsEditing(true);
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
            <ListHeader list={item} />
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
                    <CardItem
                      key={card.id}
                      index={index}
                      card={card}
                      collaborators={collaborators}
                    />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CreateTaskCard
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
