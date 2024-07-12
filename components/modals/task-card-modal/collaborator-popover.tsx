'use client';

import { RefreshCw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Collaborator } from '@prisma/client';

interface CollaboratorPopoverProps {
  collaborators: Collaborator[];
  onClick: (id: string) => void;
}

export const CollaboratorPopover = ({
  collaborators,
  onClick,
}: CollaboratorPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="w-auto h-auto outline-none p-1">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent side="bottom" align="start" className="px-0 py-3">
        <ScrollArea className="max-h-[150px]">
          {collaborators.map((collaborator) => (
            <Button
              key={collaborator.id}
              variant="ghost"
              className="w-full h-auto justify-start text-sm p-2 px-5 rounded-none"
              onClick={() => onClick(collaborator.id)}
            >
              <div className="flex items-center gap-x-2">
                <Avatar className="w-6 h-6 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
                  <AvatarImage src={collaborator.displayImage || ''} />
                  <AvatarFallback>{collaborator.displayName}</AvatarFallback>
                </Avatar>
                <p className="text-sm text-muted-foreground font-semibold text-neutral-700">
                  {collaborator.displayName}
                </p>
              </div>
            </Button>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};
