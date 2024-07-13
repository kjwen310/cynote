import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center space-x-2 transition hover:opacity-75">
        <Image src="/images/logo.svg" alt="Logo" height={40} width={40} />
        <span className="text-xl text-[#87c0cd] font-semibold mb-2">Cynote</span>
      </div>
    </Link>
  );
};
