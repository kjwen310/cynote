import { Icons } from '@/components/icons/Icon';

export default function Loading() {
  return (
    <div className="fixed z-[500] top-0 bottom-0 left-0 right-0 bg-slate-200/50 flex justify-center items-center">
      <Icons.spinner className="mr-2 h-12 w-12 animate-spin" />
    </div>
  );
}
