'use client';

import { ROLE } from '@prisma/client';
import { WorkspaceWithDetail } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Settings, UserPlus, Users, Trash, LogOut } from 'lucide-react';
import { useModal } from '@/hooks/use-modal';

interface WorkspaceHeaderProps {
  role: ROLE;
  workspace: WorkspaceWithDetail;
}

export const WorkspaceHeader = ({ role, workspace }: WorkspaceHeaderProps) => {
  const { onOpen } = useModal();
  const isOwner = role === 'OWNER';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full h-12 flex items-center text-md font-semibold border-b-2 border-neutral-200 transition dark:border-neutral-800 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
          {workspace.title}
          <ChevronDown className="w-6 h-6 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-black text-xs font-medium dark:text-neutral-400 space-y-[2px]">
        {isOwner && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('workspaceInvite')}
              className="text-sm px-3 py-2 cursor-pointer text-indigo-600 dark:text-indigo-400"
            >
              Invite People
              <UserPlus className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onOpen('workspaceCollaborator', { workspace })}
              className="text-sm px-3 py-2 cursor-pointer text-indigo-600 dark:text-indigo-400"
            >
              Manage Collaborators
              <Users className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          onClick={() => onOpen('workspaceSetting', { workspace })}
          className="text-sm px-3 py-2 cursor-pointer"
        >
          Workspace Settings
          <Settings className="w-4 h-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {isOwner ? (
          <DropdownMenuItem
            onClick={() => onOpen('confirm')}
            className="text-sm px-3 py-2 cursor-pointer text-rose-500"
          >
            Delete Workspace
            <Trash className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => onOpen('confirm')}
            className="text-sm px-3 py-2 cursor-pointer text-rose-500"
          >
            Leave Workspace
            <LogOut className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
