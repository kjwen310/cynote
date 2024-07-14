'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Collaborator, User, Workspace } from '@prisma/client';

import { cn } from '@/lib/utils';
import { useMobileSidebar } from '@/hooks/use-mobile-sidebar';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { NavSidebar } from './index';
import { WorkspaceSidebar } from '../../workspace/[workspaceId]/_components/workspace-sidebar';
import { WorkspaceWithDetail } from '@/types';

interface MobileSidebarTriggerProps {
  workspaces: Workspace[];
  user: User;
  workspace?: WorkspaceWithDetail;
  collaborator?: Collaborator;
  isOwner?: boolean;
  isValid?: boolean;
  isReachTaskBoardLimit?: boolean;
  isReachNoteLimit?: boolean;
}

export const MobileSidebarTrigger = ({
  workspaces,
  user,
  workspace,
  collaborator,
  isOwner = false,
  isValid = false,
  isReachTaskBoardLimit,
  isReachNoteLimit,
}: MobileSidebarTriggerProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onOpen, onClose } = useMobileSidebar();

  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="fixed z-50 top-4 left-4 w-[48px] h-[48px] rounded-[24px] bg-background"
        onClick={onOpen}
      >
        <Menu className="w-4 h-4" />
      </Button>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          side="left"
          className={cn('p-0', workspace ? 'w-[312px]' : 'w-[72px]')}
        >
          <div className="flex h-full">
            <div className={'w-[72px] h-full'}>
              <NavSidebar workspaces={workspaces} user={user} />
            </div>
            {workspace && collaborator && (
              <div className="w-[240px] h-full">
                <WorkspaceSidebar
                  workspace={workspace}
                  collaborator={collaborator}
                  isOwner={isOwner}
                  isValid={isValid}
                  isReachTaskBoardLimit={isReachTaskBoardLimit}
                  isReachNoteLimit={isReachNoteLimit}
                />
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};
