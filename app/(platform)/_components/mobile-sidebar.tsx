'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useIsMounted } from 'usehooks-ts';
import { ArrowRightFromLine } from 'lucide-react';

import { useMbSidebar } from '@/hooks/use-mb-sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Sidebar } from './sidebar';
import { User, Workspace } from '@prisma/client';

interface MobileSidebarProps {
  workspaces: Workspace[];
  user: User;
}

export const MobileSidebar = ({
  workspaces,
  user
}: MobileSidebarProps) => {
  const isOpen = useMbSidebar((state) => state.isOpen);
  const onOpen = useMbSidebar((state) => state.onOpen);
  const onClose = useMbSidebar((state) => state.onClose);

  const isMounted = useIsMounted();
  const pathname = usePathname();

  useEffect(() => {
    onClose();
  }, [onClose, pathname]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpen}
        className="block md:hidden mr-2"
      >
        <ArrowRightFromLine className="w-4 h-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left">
          <Sidebar storageKey="cy-sidebar-mb" workspaces={workspaces} user={user} />
        </SheetContent>
      </Sheet>
    </>
  );
};
