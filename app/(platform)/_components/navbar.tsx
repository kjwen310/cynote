import { Plus } from 'lucide-react';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { MobileSidebar } from './mobile-sidebar';
import { Workspace } from '@prisma/client';

interface NavbarProps {
  workspaces: Workspace[];
}

export const Navbar = ({
  workspaces
}: NavbarProps) => {
  return (
    <nav className="fixed w-full h-14 flex items-center z-50 top-0 border-b shadow-sm bg-white px-4">
      <MobileSidebar workspaces={workspaces} />
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
      </div>
      <Button
        size="sm"
        className="h-auto rounded-sm hidden px-2 py-1.5 md:block"
      >
        Create
      </Button>
      <Button size="sm" className="block rounded-sm md:hidden">
        <Plus />
      </Button>
    </nav>
  );
};
