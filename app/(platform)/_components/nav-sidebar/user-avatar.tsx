'use client';

import { User } from '@prisma/client';
import { useModal } from '@/hooks/use-modal';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface UserAvatarProps {
  user: User;
}

export const UserAvatar = ({ user }: UserAvatarProps) => {
  const { onOpen } = useModal();

  return (
    <Avatar className="w-10 h-10" onClick={() => onOpen('user', { user })}>
      <AvatarImage src={user.avatarImg || ''} className="cursor-pointer" />
      <AvatarFallback>{user.name}</AvatarFallback>
    </Avatar>
  );
};
