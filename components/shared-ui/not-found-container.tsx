import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface NotFoundContainerProps {
  info?: string;
  showBtn?: boolean;
}

export const NotFoundContainer = ({
  info = '',
  showBtn = false,
}: NotFoundContainerProps) => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center space-y-8 bg-slate-200">
      <div className="relative w-full h-[400px] aspect-video">
        <Image
          src="/images/not-found.svg"
          fill
          alt="not-found"
          className="bg-cover bg-center"
        />
      </div>
      {info && <p className="text-lg text-slate-700 font-semibold">{info}</p>}
      {showBtn && (
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back To Landing Page</Link>
        </Button>
      )}
    </div>
  );
};
