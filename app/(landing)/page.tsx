import { Poppins } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function LandingPage() {
  return (
    <div
      className={cn(
        'flex flex-col justify-center items-center space-y-8',
        textFont.className
      )}
    >
      <section className="w-screen h-[600px] flex justify-center items-center bg-slate-200 pt-16 px-4">
        <div className="flex flex-col justify-center items-center gap-y-4 text-center max-w-4xl">
          <h1 className="text-5xl font-semibold leading-tight md:text-7xl dark:text-zinc-700">
            Best Tool For Teamwork
          </h1>
          <p className="text-md text-zinc-600">
            Enhance your team's productivity and collaboration with the ultimate
            tool designed for seamless teamwork. Boost efficiency, streamline
            communication, and achieve your goals together with ease.
          </p>
          <Button size="lg" asChild>
            <Link href="/sign-in">Get Cynote For Free</Link>
          </Button>
        </div>
      </section>

      <section className="max-w-5xl h-[600px] flex justify-center items-center mx-auto px-8">
        <div className="flex flex-col items-center gap-y-4 md:flex-row md:gap-x-12 md:gap-y-0">
          <Image
            src="/images/landing_1.svg"
            height={400}
            width={400}
            alt="task"
          />
          <div className="flex flex-col gap-y-8">
            <h2 className="text-5xl font-semibold leading-tight md:text-7xl">
              Create Tasks for Anyone
            </h2>
            <p className="text-md text-zinc-600">
              Simplify task management by creating tasks for yourself and
              others. Assign, track, and manage tasks effortlessly, ensuring
              everyone stays organized and on track.
            </p>
          </div>
        </div>
      </section>

      <div className="w-screen h-[600px] bg-slate-200 px-8">
        <section className="max-w-4xl h-full flex justify-center items-center mx-auto">
          <div className="flex flex-col items-center gap-y-4 md:flex-row-reverse md:gap-x-12 md:gap-y-0">
            <Image
              src="/images/landing_2.svg"
              height={400}
              width={400}
              alt="note"
            />
            <div className="flex flex-col gap-y-8">
              <h2 className="text-5xl font-semibold leading-tight md:text-7xl dark:text-zinc-700">
                Share Notes Seamlessly
              </h2>
              <p className="text-md text-zinc-600">
                Enhance collaboration and efficiency by sharing your notes
                seamlessly. Empower your team with easy access to vital
                information and streamlined workflows.
              </p>
            </div>
          </div>
        </section>
      </div>

      <section className="max-w-4xl h-[600px] flex justify-center items-center mx-auto px-8">
        <div className="flex flex-col items-center gap-y-4 md:flex-row md:gap-x-12 md:gap-y-0">
          <Image
            src="/images/landing_3.svg"
            height={400}
            width={400}
            alt="workspace"
          />
          <div className="flex flex-col gap-y-8">
            <h2 className="text-5xl font-semibold leading-tight md:text-7xl">
              Explore and Connect
            </h2>
            <p className="text-md text-zinc-600">
              Discover new opportunities and build meaningful connections.
              Engage with like-minded individuals, expand your network, and
              explore a world of possibilities through vibrant social
              interactions.
            </p>
          </div>
        </div>
      </section>

      <section className="w-screen flex justify-center bg-slate-200 py-8 px-4">
        <div className="max-w-4xl flex flex-col items-center gap-y-8">
          <div className="relative max-w-4xl w-full h-[280px] md:w-[620px] md:h-[420px]">
            <Image
              src="/images/landing_4.svg"
              fill
              alt="workspace"
              className="object-center object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-8 text-center">
            <h2 className="text-5xl font-semibold leading-tight md:text-7xl dark:text-zinc-700">
              Start Your Amazing Trip Today!
            </h2>
            <p className="text-md text-zinc-600">
              Embark on an unforgettable journey with us. Don't wait—begin your
              amazing trip today and explore the world like never before.
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/sign-in">Get Start For Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
