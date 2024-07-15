'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center text-center gap-y-8 bg-[#87c0cd]">
      <p className='text-sm text-slate-700 font-semibold'>There was a problem</p>
      <h2 className="text-3xl text-slate-700 font-semibold">
        {error.message || 'Something Went Wrong'}
      </h2>
      <div className="max-w-[240px] flex items-center gap-x-4">
        <Button size="lg" onClick={reset}>
          Try again
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
