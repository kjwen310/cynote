'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { TaskListWithTaskCard } from '@/types';
import { updateTaskCardOrder } from '@/actions/task/update-task-card-order';
import { updateTaskListOrder } from '@/actions/task/update-task-list-order';
import { CreateTaskList } from './create-task-list';
import { ListItem } from './list-item';
import { Button } from '@/components/ui/button';
import { useInviteModal } from '@/hooks/use-invite-modal';
import { useMemberModal } from '@/hooks/use-member-modal';
import { useAction } from '@/hooks/use-action';
import { useToast } from '@/components/ui/use-toast';

interface ListContainerProps {
  boardId: string;
  list: TaskListWithTaskCard[];
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ListContainer = ({ boardId, list }: ListContainerProps) => {
  const [orderedList, setOrderedList] = useState(list);
  const params = useParams();
  const { workspaceId } = params;
  const { toast } = useToast();

  const onOpen = useInviteModal((state) => state.onOpen);
  const onMemberOpen = useMemberModal((state) => state.onOpen);

  useEffect(() => {
    setOrderedList(list);
  }, list);

  const { execute: executeUpdateTaskListOrder } = useAction(updateTaskListOrder, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Reordered Lists',
      });
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
  });

  const { execute: executeUpdateTaskCardOrder } = useAction(updateTaskCardOrder, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Reordered Cards',
      });
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
  });

  const onDragEnd = (result: any) => {
    const { source, destination, type } = result;

    if (
      !destination ||
      (source.draggableId === destination.draggableId &&
        source.index === destination.index)
    ) {
      return;
    }

    if (type === 'task-list') {
      const reorderedList = reorder(
        orderedList,
        source.index,
        destination.index
      );
      const updatedList = reorderedList.map((d, i) => ({ ...d, order: i }));
      setOrderedList(updatedList);
      executeUpdateTaskListOrder({
        items: updatedList,
        taskBoardId: boardId,
        workspaceId: workspaceId as string,
      });
    }

    if (type === 'task-card') {
      const newOrderedList = [...orderedList];

      const sourceList = newOrderedList.find(
        (d) => d.id === source.droppableId
      );
      const destinationList = newOrderedList.find(
        (d) => d.id === destination.droppableId
      );

      if (!sourceList || !destinationList) return;
      if (!sourceList.taskCards) sourceList.taskCards = [];
      if (!destinationList.taskCards) destinationList.taskCards = [];

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.taskCards,
          source.index,
          destination.index
        );

        reorderedCards.forEach((card, i) => {
          card.order = i;
        });

        sourceList.taskCards = reorderedCards;

        setOrderedList(newOrderedList);
        executeUpdateTaskCardOrder({
          items: reorderedCards,
          taskBoardId: boardId,
          workspaceId: workspaceId as string,
        });
      } else {
        const [movedCard] = sourceList.taskCards.splice(source.index, 1);
        movedCard.taskListId = destination.droppableId;
        destinationList.taskCards.splice(destination.index, 0, movedCard);

        sourceList.taskCards.forEach((card, i) => {
          card.order = i;
        });

        destinationList.taskCards.forEach((card, i) => {
          card.order = i;
        });

        setOrderedList(newOrderedList);
        executeUpdateTaskCardOrder({
          items: destinationList.taskCards,
          taskBoardId: boardId,
          workspaceId: workspaceId as string,
        });
      }
    }
  };

  return (
    <>
      <Button onClick={onOpen}>Invite</Button>
      <Button onClick={onMemberOpen}>Member</Button>
      <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId="task-list"
        type="task-list"
        direction="horizontal"
      >
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedList &&
              orderedList.map((item, index) => (
                <ListItem key={item.id} index={index} item={item} />
              ))}
            {provided.placeholder}
            <CreateTaskList />
            <div className="w-1 flex-shrink-0" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
    </>
  );
};
