import { User, Workspace } from '@prisma/client';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { NavAction } from './nav-action';
import { NavItem } from './nav-item';
import { UserAvatar } from './user-avatar';

interface NavSidebarProps {
  workspaces: Workspace[];
  user: User;
}

export const NavSidebar = ({
  workspaces,
  user,
}: NavSidebarProps) => {
  return (
    <div className="flex flex-col items-center space-y-4 w-full h-full text-primary dark:bg-[#1E1F22] py-3">
      <NavAction />
      <Separator className="w-10 h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md mx-auto" />
      <ScrollArea className="w-full flex-1">
        {workspaces.map((workspace) => (
          <div key={workspace.id} className="mb-4">
            <NavItem
              id={workspace.id}
              title={workspace.title}
              image={workspace.imageSmUrl}
            />
          </div>
        ))}
      </ScrollArea>
      <div className="flex flex-col items-center gap-y-4 mt-auto pb-3">
        <ModeToggle />
        <UserAvatar user={user} />
      </div>
    </div>
  );
};
