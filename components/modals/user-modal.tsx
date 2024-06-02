'use client';

import { useModal } from '@/hooks/use-modal';
import { Button } from '@/components/ui/button';
import { useAction } from '@/hooks/use-action';
import { DialogModal } from '@/components/dialog-modal';
import { signOut } from '@/actions/auth/sign-out';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '../ui/separator';

export const UserModal = () => {
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'user' && isOpen;

  const { toast } = useToast();
  const { user } = data;

  const { execute, isLoading } = useAction(signOut, {
    onSuccess: () => {
      toast({
        title: 'SUCCESS',
        description: 'Successfully signed out',
      });
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: `Something went wrong, ${error}`,
      });
    },
    onFinally: onClose,
  });

  const modalBody = (
    <div>
      <Avatar className="w-12 h-12 mx-auto mb-8">
        <AvatarImage src={user?.avatarImg || ''} />
        <AvatarFallback>{user?.name}</AvatarFallback>
      </Avatar>
      <div className="w-full flex flex-col gap-y-4">
        <div className="flex justify-between items-center">
          <div className="text-md font-semibold">Name</div>
          <div className="text-md">{user?.name}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-md font-semibold">Email</div>
          <div className="text-md">{user?.email}</div>
        </div>
        <Separator />
        <Button
          variant="secondary"
          disabled={isLoading}
          className="w-full"
          onClick={() => execute({})}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );

  return <DialogModal body={modalBody} isOpen={modalOpen} onClose={onClose} />;
};
