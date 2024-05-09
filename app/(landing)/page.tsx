import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Medal } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { Button } from '@/components/ui/button';

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function LandingPage() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={cn(
          'flex flex-col justify-center items-center',
          textFont.className
        )}
      >
        <div className="flex items-center border shadow-sm bg-amber-100 text-amber-700 mb-4 p-4 rounded-full">
          <Medal className="h-6 w-6 mr-2" />
          All You Need For Task And Note Management!
        </div>
        <h1 className="text-3xl text-center text-neutral-800 mb-6 md:text-6xl">
          Cynote Is Your Best Choice
        </h1>
        <div className="w-fit text-3xl bg-gradient-to-r from-fuchsia-800 to-pink-600 text-white rounded-md px-4 pt-2 pb-4 md:text-6xl">
          Go Beyond
        </div>
        <div className="text-sm text-neutral-500 text-center max-w-xs mt-4 md:text-lg md:max-w-2xl">
          Collaborate, manage projects, and reach new productivity peak. Collaborate, and reach new productivity peak.
        </div>
        <Button className="mt-6" size="lg" asChild>
          <Link href="/sign-up">Get Cynote For Free</Link>
        </Button>
      </div>
    </div>
  );
}
