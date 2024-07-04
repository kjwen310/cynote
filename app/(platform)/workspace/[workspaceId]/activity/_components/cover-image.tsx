import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CoverImageProps {
  image: string;
}

export const CoverImage = ({ image }: CoverImageProps) => {
  return (
    <div
      className={cn(
        'relative w-full h-[36vh] group',
        image ? 'bg-muted' : 'h-[12vh]'
      )}
    >
      {!!image && (
        <Image
          fill
          src={image}
          sizes="(max-width: 768px) 100vw"
          alt="note cover image"
          className="object-cover"
        />
      )}
    </div>
  );
};
