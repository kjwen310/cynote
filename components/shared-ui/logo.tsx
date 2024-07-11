import Link from 'next/link';
import Image from 'next/image';

export const Logo = () => {
  return (
    <Link href="/">
      <div className="flex items-center transition hover:opacity-75">
        <Image src="/images/logo.svg" alt="Logo" height={100} width={100} />
      </div>
    </Link>
  );
};
