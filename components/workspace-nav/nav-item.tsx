'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { defaultPickerImages } from '@/constant/default-picker-image';

interface NavItemProps {
  id: string;
  title: string;
  image: string;
}

export const NavItem = ({ id, title, image }: NavItemProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/workspace/${id}`);
  }

  return (
    <button onClick={onClick} className="relative flex items-center group">
      <div
        className={cn(
          'absolute left-0 w-[4px] bg-primary rounded-r-full transition-all',
          params.workspaceId !== id && 'group-hover:h-[20px]',
          params.workspaceId === id ? 'h-[36px]' : 'h-[8px]'
        )}
      />
      <div
        className={cn(
          'relative w-[48px] h-[48px] flex rounded-[24px] group overflow-hidden transition-all group-hover:rounded-[16px] mx-3',
          params.workspaceId === id &&
            'bg-primary/10 text-primary rounded-[16px]'
        )}
      >
        <Image
          fill
          src={defaultPickerImages[0].urls.thumb}
          alt="workspace image"
        />
      </div>
    </button>
  );
};
