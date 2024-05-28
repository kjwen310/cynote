'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useModal } from '@/hooks/use-modal';
import { fetcher } from '@/lib/fetcher';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import { DialogModal } from '@/components/dialog-modal';

export const WorkspaceInviteModal = () => {
  const [copied, setCopied] = useState(false);
  const { type, isOpen, onClose } = useModal();
  const modalOpen = type === 'workspaceInvite' && isOpen;

  const params = useParams();
  const { workspaceId } = params;

  const { data: workspaceData } = useQuery({
    queryKey: ['workspace-invite', workspaceId],
    queryFn: () => fetcher(`/api/invite/${workspaceId}`),
  });

  const origin = useOrigin();
  const inviteCode = workspaceData?.inviteCode || '';
  const inviteUrl = `${origin}/invite/${inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const modalBody = (
    <div className="space-y-4 p-6">
      <Label>Invite Link</Label>
      <div className="flex items-center gap-x-2 mt-2">
        <Input
          readOnly
          value={inviteUrl}
          className="border-0 text-black bg-zinc-200 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button size="icon" onClick={onCopy}>
          {copied ? (
            <Check className="w-4 h-4" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
      <Button variant="ghost" onClick={() => {}}>
        Generate a new link
        <RefreshCw className="w-3 h-3 ml-2" />
      </Button>
    </div>
  );

  return (
    <DialogModal
      title="Invite"
      description="Invite people to your workspace"
      body={modalBody}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
