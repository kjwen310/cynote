'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useIsMounted } from 'usehooks-ts';
import { Menu } from 'lucide-react';

import { useMbSidebar } from '@/hooks/use-mb-sidebar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Sidebar } from './sidebar';

export const MobileSidebar = () => {
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
        <Menu className="w-4 h-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-2 pt-10">
          <Sidebar storageKey="cy-sidebar-mb" />
        </SheetContent>
      </Sheet>
    </>
  );
};
