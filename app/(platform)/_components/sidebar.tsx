'use client';

import { Workspace } from '@prisma/client';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion } from '@/components/ui/accordion';
import { NavItem } from './nav-item';

interface SidebarProps {
  storageKey?: string;
  workspaces: Workspace[];
}

export const Sidebar = ({ storageKey = 'cy-sidebar', workspaces }: SidebarProps) => {
    const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(storageKey, {});

    const defaultAccordionValue: string[] = Object.keys(expanded).reduce((acc: string[], curr: string) => {
        if (expanded[curr]) acc.push(curr);
        return acc;
    }, []);

    const onExpand = (id: string) => {
      setExpanded((curr) => ({
        ...curr,
        [id]: !expanded[id],
      }));
    }

  return (
    <>
      <div className="flex items-center text-xs font-medium mb-1">
        <span className="pl-4">
          Workspaces
        </span>
        <Button type="button" variant="ghost" size="icon" className="ml-auto" asChild>
            <Link href="/select-workspace">
              <Plus className="w-4 h-4" />
            </Link>
        </Button>
      </div>
      <Accordion type="multiple" defaultValue={defaultAccordionValue} className="space-y-2">
        {workspaces.map((workspace) => (
            <NavItem
              key={workspace.id}
              isActive={true}
              isExpanded={expanded[workspace.id]}
              workspace={workspace}
              onExpand={onExpand}
            />
        ))}
      </Accordion>
    </>
  );
};
