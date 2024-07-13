'use client';

import { ReactNode } from 'react';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface CoverImageContainerProps {
  imageUrl: string;
  showBtn?: boolean;
  btnText?: string;
  btnIcon?: ReactNode;
  onClick?: () => void;
}

export const CoverImageContainer = ({
  imageUrl,
  showBtn,
  btnText,
  btnIcon,
  onClick,
}: CoverImageContainerProps) => {
  return (
    <div
      className={cn(
        'relative w-full h-[36vh] group',
        imageUrl ? 'bg-muted' : 'h-[12vh]'
      )}
    >
      {!!imageUrl && (
        <Image
          fill
          src={imageUrl}
          sizes="(max-width: 768px) 100vw"
          alt="note cover image"
          className="object-cover"
        />
      )}
      {showBtn && (
        <div className="absolute bottom-5 right-5 md:opacity-0 md:group-hover:opacity-100">
          <Button
            variant="outline"
            size="sm"
            onClick={onClick}
            className="text-xs text-muted-foreground"
          >
            {btnIcon}
            {btnText}
          </Button>
        </div>
      )}
    </div>
  );
};
