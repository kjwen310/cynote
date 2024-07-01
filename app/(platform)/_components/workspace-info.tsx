import Link from 'next/link';
import Image from 'next/image';

export const WorkspaceInfo = () => {
  return (
    <Link
      href="/workspace"
      className="flex justify-center items-center w-[48px] h-[48px] rounded-[24px] bg-background overflow-hidden transition-all hover:rounded-[16px] dark:bg-neutral-700"
    >
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image src="/images/logo.svg" alt="Logo" height={100} width={100} />
      </div>
    </Link>
  );
};
