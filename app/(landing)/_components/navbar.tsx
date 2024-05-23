import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="mx-auto flex items-center w-full justify-between md:max-w-screen-2xl">
        <Logo />
        <div className="flex items-center justify-between w-full space-x-4 md:block md:w-auto">
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-in">
              Sign In
            </Link>
          </Button>
          <Button size="sm" variant="outline" asChild>
            <Link href="/sign-out">
              Sign Out
            </Link>
          </Button>
          <Button size="sm" asChild>
            <Link href="/sign-up">
              Get Cynote For Free
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};
