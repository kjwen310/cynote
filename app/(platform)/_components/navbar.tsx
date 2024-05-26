import { Plus } from 'lucide-react';
import { Logo } from '@/app/(landing)/_components/logo';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { MobileSidebar } from './mobile-sidebar';
import { Workspace } from '@prisma/client';

interface NavbarProps {
  workspaces: Workspace[];
}

export const Navbar = ({ workspaces }: NavbarProps) => {
  return (
    <nav className="fixed w-full z-50 top-0 border-b shadow-sm bg-white px-4 py-2">
      <MobileSidebar workspaces={workspaces} />
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="flex items-center gap-x-4">
            <div className="hidden md:flex">
              <Logo />
            </div>
          </div>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};
