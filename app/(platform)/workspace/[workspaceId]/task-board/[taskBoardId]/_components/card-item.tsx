'use client';

import { Draggable } from '@hello-pangea/dnd';
import { TaskCard } from '@prisma/client';

interface CardItemProps {
  index: number;
  card: TaskCard;
}

export const CardItem = ({ index, card }: CardItemProps) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="text-sm rounded-md bg-white shadow-sm truncate border-2 border-transparent hover:border-black px-3 py-2"
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};
