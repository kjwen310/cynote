'use client';

import { User, Workspace } from '@prisma/client';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { useModal } from '@/hooks/use-modal';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface SidebarProps {
  storageKey?: string;
  workspaces: Workspace[];
  user: User;
}

export const Sidebar = ({
  storageKey = 'cy-sidebar',
  workspaces,
  user,
}: SidebarProps) => {
  const { onOpen } = useModal();

  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {}
  );

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], curr: string) => {
      if (expanded[curr]) acc.push(curr);
      return acc;
    },
    []
  );

  const onExpand = (id: string) => {
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  return (
    <div className="h-[800px] flex">
      <div className="relative bg-slate-700 p-4">
        <div className="flex flex-col gap-y-4">
          <Button
            variant="ghost"
            className="w-12 h-12 rounded-full bg-slate-200"
          >
            <Link href="/workspace">Hi</Link>
          </Button>
          <Separator />
          {workspaces.map((workspace) => (
            <Button
              key={workspace.id}
              variant="ghost"
              className="w-12 h-12 rounded-full bg-slate-200 transition-all hover:rounded-lg"
            >
              <Link href={`/workspace/${workspace.id}`}>{workspace.title}</Link>
            </Button>
          ))}
          <Separator />
          <Button
            variant="ghost"
            className="w-12 h-12 rounded-full bg-slate-200"
          >
            <Plus />
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-y-4">
          <Avatar className="w-8 h-8">
            <AvatarImage src={user.avatarImg || ''} />
            <AvatarFallback>{user.name}</AvatarFallback>
          </Avatar>
          <ModeToggle />
        </div>
      </div>
      <div className="w-[200px] flex flex-col bg-slate-400">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div>test</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() =>
                onOpen('workspaceInvite', { workspace: workspaces[0] })
              }
            >
              Invite People
            </DropdownMenuItem>
            <Separator />
            <DropdownMenuItem
              onClick={() =>
                onOpen('workspaceInvite', { workspace: workspaces[0] })
              }
            >
              Workspace Setting
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>Payment</DropdownMenuItem>
            <Separator />
            <DropdownMenuItem
              onClick={() =>
                onOpen('confirm', {
                  confirm: { title: 'Are you sure to delete workspace?' },
                })
              }
            >
              Delete Workspace
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                onOpen('confirm', {
                  confirm: {
                    title: 'Are you sure to quit workspace?',
                    description: 'You have to get a invitation to re-join.',
                  },
                })
              }
            >
              Quit Workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator />
      </div>
    </div>
  );
};
