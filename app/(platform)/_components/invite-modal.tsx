'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useInviteModal } from '@/hooks/use-invite-modal';
import { fetcher } from '@/lib/fetcher';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';

export const InviteModal = () => {
  const isOpen = useInviteModal((state) => state.isOpen);
  const onOpen = useInviteModal((state) => state.onOpen);
  const onClose = useInviteModal((state) => state.onClose);

  const origin = useOrigin();
  const inviteUrl = `${origin}`;

  const params = useParams();
  const { workspaceId } = params;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-6">
          <Label>Invite Link</Label>
          <div className="flex items-center gap-x-2 mt-2">
            <Input
              className="border-0 text-black bg-zinc-200 focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
            />
            <Button size="icon">
              <Copy className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="ghost">
            Generate a new link
            <RefreshCw className="w-3 h-3 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
