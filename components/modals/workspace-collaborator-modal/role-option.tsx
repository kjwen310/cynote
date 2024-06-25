'use client';

import { Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ROLE } from '@prisma/client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface RoleOptionProps {
  collaboratorId: string;
  onUpdate: (collaboratorId: string, role: ROLE) => void;
}

export const RoleOption = ({ collaboratorId, onUpdate }: RoleOptionProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Edit className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-zinc-400 dark:text-zinc-400" />
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="max-w-[120px] px-0 py-3">
        <Button
          variant="ghost"
          className="w-full h-auto justify-start text-sm p-2 px-5 rounded-none"
          onClick={() => onUpdate(collaboratorId, "OWNER")}
        >
          Owner
        </Button>
        <Button
          variant="ghost"
          className="w-full h-auto justify-start text-sm p-2 px-5 rounded-none"
          onClick={() => onUpdate(collaboratorId, "MEMBER")}
        >
          Member
        </Button>
      </PopoverContent>
    </Popover>
  );
};
