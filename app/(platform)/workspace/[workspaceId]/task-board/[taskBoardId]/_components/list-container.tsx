'use client';

import { useState, useEffect } from 'react';
import { TaskListWithTaskCard } from '@/types';
import { CreateTaskList } from './create-task-list';
import { ListItem } from './list-item';

interface ListContainerProps {
  boardId: string;
  list: TaskListWithTaskCard[];
}

export const ListContainer = ({ boardId, list }: ListContainerProps) => {
  const [orderedList, setOrderedList] = useState(list);

  useEffect(() => {
    setOrderedList(list);
  }, list);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedList && orderedList.map((item, index) => (
        <ListItem key={item.id} index={index} item={item} />
      ))}
      <CreateTaskList />
      <div className="w-1 flex-shrink-0" />
    </ol>
  );
};
