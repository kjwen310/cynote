'use client';

import { Draggable } from '@hello-pangea/dnd';
import { TaskCard } from '@prisma/client';
import { useCardModal } from '@/hooks/use-card-modal';

interface CardItemProps {
  index: number;
  card: TaskCard;
}

export const CardItem = ({ index, card }: CardItemProps) => {
  const onOpen = useCardModal((state) => state.onOpen);

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="text-sm rounded-md bg-white shadow-sm truncate border-2 border-transparent hover:border-black px-3 py-2"
          onClick={() => onOpen(card.id)}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};
