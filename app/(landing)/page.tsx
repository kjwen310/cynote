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
        'flex flex-col justify-center items-center',
        textFont.className
      )}
    >
      <section className="w-screen h-[600px] flex justify-center items-center bg-slate-200 pt-16">
        <div className="flex flex-col justify-center items-center gap-y-4 text-center max-w-4xl">
          <h1 className="text-6xl">Best Tool For Teamwork</h1>
          <p className="text-lg">
            dsfs gdfnhgjgjgjgj gjkjkjkj kkhkhhkhj hkklklj lljlkj lhkkjkjkkgkg
            kjhkjhk jhkjhkj hkhjk hklhlhklklk lhlhlhkh llhlhhj lhkl hllhkl
            hlhklhlh lhlh hlhlhlhk hlhklhlh lhlh hlhlhlhk!
          </p>
          <Button size="lg" asChild>
            <Link href="/sign-in">Get Cynote For Free</Link>
          </Button>
        </div>
      </section>

      <section className="max-w-4xl h-[600px] flex justify-center items-center mx-auto px-8">
        <div className="flex flex-col items-center gap-y-4 md:flex-row md:gap-x-12 md:gap-y-0">
          <Image src="/landing_1.svg" height={400} width={400} alt="task" />
          <div className="flex flex-col gap-y-8">
            <h2 className="text-2xl font-bold">
              Create a task for you and anyone
            </h2>
            <p className="text-lg text-slate-500">
              dsfs gdfnhgjgjgjgj gjkjkjkj kkhkhhkhj hkklklj lljlkj lhkkjkjkkgkg
              kjhkjhk jhkjhkj hkhjk hklhlhklklk lhlhlhkh llhlhhj lhkl hllhkl
              hlhklhlh lhlh hlhlhlhk hlhklhlh lhlh hlhlhlhk!
            </p>
          </div>
        </div>
      </section>

      <div className="w-screen bg-slate-200 px-8">
        <section className="max-w-4xl h-[600px] flex justify-center items-center mx-auto">
          <div className="flex flex-col items-center gap-y-4 md:flex-row md:gap-x-12 md:gap-y-0">
            <div className="flex flex-col gap-y-8">
              <h2 className="text-2xl font-bold">
                Share your note with productivity
              </h2>
              <p className="text-lg text-slate-500">
                dsfs gdfnhgjgjgjgj gjkjkjkj kkhkhhkhj hkklklj lljlkj
                lhkkjkjkkgkg kjhkjhk jhkjhkj hkhjk hklhlhklklk lhlhlhkh llhlhhj
                lhkl hllhkl hlhklhlh lhlh hlhlhlhk hlhklhlh lhlh hlhlhlhk!
              </p>
            </div>
            <Image src="/landing_2.svg" height={400} width={400} alt="note" />
          </div>
        </section>
      </div>

      <section className="max-w-4xl h-[600px] flex justify-center items-center mx-auto px-8">
        <div className="flex flex-col items-center gap-y-4 md:flex-row md:gap-x-12 md:gap-y-0">
          <Image
            src="/landing_3.svg"
            height={400}
            width={400}
            alt="workspace"
          />
          <div className="flex flex-col gap-y-8">
            <h2 className="text-2xl font-bold">
              Explore and connect with people
            </h2>
            <p className="text-lg text-slate-500">
              dsfs gdfnhgjgjgjgj gjkjkjkj kkhkhhkhj hkklklj lljlkj lhkkjkjkkgkg
              kjhkjhk jhkjhkj hkhjk hklhlhklklk lhlhlhkh llhlhhj lhkl hllhkl
              hlhklhlh lhlh hlhlhlhk hlhklhlh lhlh hlhlhlhk!
            </p>
          </div>
        </div>
      </section>

      <section className="w-screen flex justify-center bg-slate-200 py-8">
        <div className="max-w-4xl flex flex-col items-center gap-y-8">
          <div className="relative max-w-4xl w-[620px] h-[420px]">
            <Image
              src="/landing_4.svg"
              fill
              alt="workspace"
              className="object-center object-cover"
            />
          </div>
          <div className="flex flex-col gap-y-8 text-center">
            <h2 className="text-2xl font-bold">
              Start your amazing trip today!
            </h2>
            <p className="text-lg text-slate-500">
              dsfs gdfnhgjgjgjgj gjkjkjkj kkhkhhkhj hkklklj lljlkj lhkkjkjkkgkg
              kjhkjhk jhkjhkj hkhjk hklhlhklklk lhlhlhkh llhlhhj lhkl hllhkl
              hlhklhlh lhlh hlhlhlhk hlhklhlh lhlh hlhlhlhk!
            </p>
          </div>
          <Button size="lg" asChild>
            <Link href="/sign-in">Get Start</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
