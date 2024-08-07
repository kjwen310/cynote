'use client';

import { ShieldCheck, ShieldAlert } from 'lucide-react';
import { Collaborator, ROLE } from '@prisma/client';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface CollaboratorItemProps {
  collaborator: Collaborator;
}

const roleMap = {
  [ROLE.OWNER]: <ShieldCheck className="w-full h-full text-[#87c0cd]" />,
  [ROLE.MEMBER]: <ShieldAlert className="w-full h-full text-[#87c0cd]" />,
};

export const CollaboratorItem = ({
  collaborator,
}: CollaboratorItemProps) => {
  const icon = roleMap[collaborator.role];

  return (
    <div className="relative w-10 h-10 flex justify-center items-center">
      <Avatar className="w-8 h-8 transition hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
        <AvatarImage src={collaborator.displayImage || ''} />
        <AvatarFallback>{collaborator.displayName}</AvatarFallback>
      </Avatar>
      <div className="absolute z-10 bottom-0 right-0 w-4 h-4 flex justify-center items-center rounded-full bg-white p-0.5 dark:bg-zinc-100">
        {icon}
      </div>
    </div>
  );
};
