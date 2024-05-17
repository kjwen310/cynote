'use client';

import { MoreHorizontal, X } from 'lucide-react';
import { TaskList } from '@prisma/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { PopoverClose } from '@radix-ui/react-popover';
import { deleteTaskList } from '@/actions/task';

interface ListOptionProps {
  list: TaskList;
  onAddTaskCard: () => void;
}

export const ListOption = ({ list, onAddTaskCard }: ListOptionProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-auto h-auto p-2">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 py-3">
        <div className="text-sm font-medium text-center text-neutral-600 pb-6">
          List action
        </div>
        <PopoverClose>
          <Button
            variant="ghost"
            className="absolute top-2 right-2 w-auto h-auto text-neutral-600 p-2"
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <Button
          variant="ghost"
          className="w-full h-auto justify-start text-sm p-2 px-5 rounded-none"
        >
          Add Card...
        </Button>
        <Button
          variant="ghost"
          className="w-full h-auto justify-start text-sm p-2 px-5 rounded-none"
          onClick={() => deleteTaskList({ taskListId: list.id })}
        >
          Delete List...
        </Button>
      </PopoverContent>
    </Popover>
  );
};
