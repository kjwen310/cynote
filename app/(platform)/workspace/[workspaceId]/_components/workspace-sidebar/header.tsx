'use client';

import Link from 'next/link';
import {
  ChevronDown,
  Settings,
  UserPlus,
  Users,
  Activity,
  CornerRightUp,
} from 'lucide-react';

import { WorkspaceWithDetail } from '@/types';
import { useModal } from '@/hooks/use-modal';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { HeaderWorkspaceDelete } from './header-workspace-delete';
import { HeaderWorkspaceLeave } from './header-workspace-leave';

interface HeaderProps {
  workspace: WorkspaceWithDetail;
  isOwner: boolean;
  isAdvance: boolean;
  currentCollaboratorId: string;
}

export const Header = ({
  workspace,
  isOwner,
  isAdvance,
  currentCollaboratorId,
}: HeaderProps) => {
  const { onOpen } = useModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none px-4" asChild>
        <button className="w-full h-12 flex items-center text-md font-semibold border-b-2 border-neutral-200 transition dark:border-neutral-800 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50">
          <div className="flex items-center gap-x-2">
            {workspace.title}
            <Badge variant="outline" className="text-[10px]">
              {isAdvance ? 'Advance' : 'Basic'}
            </Badge>
          </div>
          <ChevronDown className="w-6 h-6 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-black text-xs font-medium dark:text-neutral-400 space-y-[2px]">
        {isOwner && (
          <>
            <DropdownMenuItem
              onClick={() => onOpen('workspaceInvite', { workspace })}
              className="text-sm px-3 py-2 cursor-pointer text-[#87c0cd]"
            >
              Invite People
              <UserPlus className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                onOpen('workspaceCollaborator', {
                  workspace,
                  currentCollaboratorId,
                })
              }
              className="text-sm px-3 py-2 cursor-pointer text-[#87c0cd]"
            >
              Manage Collaborators
              <Users className="w-4 h-4 ml-auto" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          onClick={() => onOpen('workspaceSetting', { workspace, isOwner })}
          className="text-sm px-3 py-2 cursor-pointer"
        >
          Workspace Settings
          <Settings className="w-4 h-4 ml-auto" />
        </DropdownMenuItem>
        {!isAdvance && (
          <DropdownMenuItem
            onClick={() => onOpen('subscription')}
            className="text-sm px-3 py-2 cursor-pointer"
          >
            Workspace Upgrade
            <CornerRightUp className="w-4 h-4 ml-auto" />
          </DropdownMenuItem>
        )}
        <DropdownMenuItem className="text-sm px-3 py-2 cursor-pointer">
          <Link href={`/workspace/${workspace.id}/activity`}>
            Workspace Activities
          </Link>
          <Activity className="w-4 h-4 ml-auto" />
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {isOwner ? (
          <HeaderWorkspaceDelete workspace={workspace} />
        ) : (
          <HeaderWorkspaceLeave workspace={workspace} />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
