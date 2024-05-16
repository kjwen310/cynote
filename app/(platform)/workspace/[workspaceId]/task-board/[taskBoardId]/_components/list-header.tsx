'use client';

import { TaskList } from "@prisma/client";

interface ListHeaderProps {
    list: TaskList;
}

export const ListHeader = ({ list }: ListHeaderProps) => {
  return (
    <div className="flex justify-between items-start gap-x-2 text-sm font-semibold pt-2 px-2">
      <div className="w-full h-7 font-medium border-transparent text-sm px-2 py-1">
        {list.title}
      </div>
    </div>
  );
};
