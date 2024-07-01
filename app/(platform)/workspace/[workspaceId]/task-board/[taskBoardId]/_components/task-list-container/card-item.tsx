'use client';

import { Draggable } from '@hello-pangea/dnd';
import { Collaborator, TaskCard } from '@prisma/client';
import { useModal } from '@/hooks/use-modal';

interface CardItemProps {
  index: number;
  card: TaskCard;
  collaborators: Collaborator[];
}

export const CardItem = ({ index, card, collaborators }: CardItemProps) => {
  const { onOpen } = useModal();

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          role="button"
          className="text-sm rounded-md bg-white shadow-sm truncate border-2 border-transparent hover:border-black px-3 py-2"
          onClick={() => onOpen('taskCard', { taskCard: card, collaborators })}
        >
          {card.title}
        </div>
      )}
    </Draggable>
  );
};
