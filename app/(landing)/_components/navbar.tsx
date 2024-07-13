import Link from 'next/link';
import { UserRound } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/shared-ui/mode-toggle';
import { Logo } from '@/components/shared-ui/logo';

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center bg-slate-200/50 p-4 md:px-8">
      <Logo />
      <div className="flex items-center space-x-2">
        <Button size="sm" variant="ghost" asChild>
          <Link href="/sign-in">
            <UserRound className="w-4 h-4" />
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};
