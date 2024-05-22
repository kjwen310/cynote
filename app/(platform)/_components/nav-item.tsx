'use client';

import { Workspace } from '@prisma/client';
import { cn } from '@/lib/utils';
import { CreditCard, Activity, Layout, Settings, Smile } from 'lucide-react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

interface NavItemProps {
  isActive: boolean;
  isExpanded: boolean;
  workspace: Workspace;
  onExpand: (id: string) => void;
}

export const NavItem = ({
  isActive,
  isExpanded,
  workspace,
  onExpand,
}: NavItemProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const routes = [
    {
      label: 'Boards',
      icon: <Layout className="w-4 h-4 mr-2" />,
      href: `/workspace/${workspace.id}`,
    },
    {
      label: 'Activity',
      icon: <Activity className="w-4 h-4 mr-2" />,
      href: `/workspace/${workspace.id}/activity`,
    },
    {
      label: 'Settings',
      icon: <Settings className="w-4 h-4 mr-2" />,
      href: `/workspace/${workspace.id}/settings`,
    },
    {
      label: 'Billing',
      icon: <CreditCard className="w-4 h-4 mr-2" />,
      href: `/workspace/${workspace.id}/billings`,
    },
  ];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <AccordionItem value={workspace.id} className="border-none">
      <AccordionTrigger
        onClick={() => onExpand(workspace.id)}
        className={cn(
          'flex items-center gap-x-2 text-neutral-700 rounded-md transition text-start no-underline p-i.5 hover:bg-neutral-500/10 hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
        )}
      >
        <div className="flex items-center gap-x-2">
          {workspace.image ? (
            <p className="w-4 h-4">{workspace.image}</p>
          ) : (
            <Smile className="w-4 h-4" />
          )}
          <p className="font-medium text-sm">{workspace.title}</p>
        </div>
      </AccordionTrigger>
      <AccordionContent className="text-neutral-700 pt-1">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            variant="ghost"
            onClick={() => onClick(route.href)}
            className={cn(
              'w-full justify-start font-normal pl-10 mb-1',
              pathname === route.href && 'bg-sky-500/10 text-sky-700'
            )}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
};
