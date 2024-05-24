'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import qs from 'query-string';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useMemberModal } from '@/hooks/use-member-modal';
import { fetcher } from '@/lib/fetcher';
import {
  Check,
  Gavel,
  Loader2,
  MoreVertical,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldQuestion,
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Collaborator, ROLE } from '@prisma/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const MemberModal = () => {
  const isOpen = useMemberModal((state) => state.isOpen);
  const onOpen = useMemberModal((state) => state.onOpen);
  const onClose = useMemberModal((state) => state.onClose);

  const [loadingId, setLoadingId] = useState('');

  const params = useParams();
  const { workspaceId } = params;

  const { data: workspaceData } = useQuery({
    queryKey: ['workspace', workspaceId],
    queryFn: () => fetcher(`/api/workspace/${workspaceId}`),
  });

  const roleMap = {
    OWNER: <ShieldCheck className="w-4 h-4" />,
    MEMBER: <ShieldAlert className="w-4 h-4" />,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Member</DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            {`${workspaceData?.collaborators?.length || 0} members`}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px]">
          {workspaceData?.collaborators &&
            workspaceData.collaborators.map((d: Collaborator) => (
              <div key={d.id} className="flex items-center gap-x-2 mb-6">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={d.displayImage} />
                </Avatar>
                <div className="flex items-center gap-x-1 text-xs font-semibold">
                  {d.displayName}
                  {roleMap[d.role]}
                </div>
                {d.id !== loadingId && (
                  <div className="ml-auto">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="left">
                        <DropdownMenuSub>
                          <DropdownMenuSubTrigger className="flex items-center">
                            <ShieldQuestion className="w-4 h-4 mr-2" />
                            <span>Role</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              <DropdownMenuItem>
                                <Shield className="w-4 h-4 mr-2" />
                                Member
                              </DropdownMenuItem>
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Gavel className="w-4 h-4 mr-2" />
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}
                {loadingId === d.id && (
                  <Loader2 className="w-4 h-4 animate-spin text-zinc-500 ml-auto" />
                )}
              </div>
            ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
