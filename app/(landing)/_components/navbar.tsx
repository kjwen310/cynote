import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Logo } from './logo';

export const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 right-0 flex justify-between items-center bg-slate-200/50 px-8 py-4">
      <Logo />
      <div className="flex items-center space-x-4">
        <Button size="sm" variant="outline" asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};
