import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center gap-y-4 bg-slate-200">
      <div className="relative max-w-lg h-[400px] aspect-video">
        <Image
          src="/images/not-found.svg"
          fill
          alt="not-found"
          className="bg-cover bg-center"
        />
      </div>
      <Button size="lg" variant="ghost" asChild>
        <Link href="/">Back To Landing Page</Link>
      </Button>
    </div>
  );
}
