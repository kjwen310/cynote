'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useModal } from '@/hooks/use-modal';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Check, Copy, RefreshCw } from 'lucide-react';
import { useOrigin } from '@/hooks/use-origin';
import { useAction } from '@/hooks/use-action';
import { DialogModal } from '@/components/dialog-modal';
import { refreshInviteCode } from '@/actions/workspace/refresh-invite-code';
import { useToast } from '@/components/ui/use-toast';
import Loading from '@/components/loading';

export const WorkspaceInviteModal = () => {
  const [copied, setCopied] = useState(false);

  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'workspaceInvite' && isOpen;

  const { workspace } = data;

  const router = useRouter();
  const { toast } = useToast();
  const origin = useOrigin();
  const inviteCode = workspace?.inviteCode || '';
  const inviteUrl = `${origin}/invite/${inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const { execute, isLoading } = useAction(refreshInviteCode, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully Refresh invite code',
      });
    },
    onFinally: () => {
      router.refresh();
    },
  });

  const onRefresh = () => {
    if (!workspace) return;
    execute({ workspaceId: workspace.id });
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
      <Button variant="ghost" onClick={onRefresh}>
        Generate a new link
        <RefreshCw className="w-3 h-3 ml-2" />
      </Button>
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }

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
