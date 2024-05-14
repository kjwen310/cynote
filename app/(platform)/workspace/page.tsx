import Image from 'next/image';
import { CreateWorkspace } from '../_components/create-workspace';

export default function WorkspacePage() {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-6">
      <Image src="/explore.svg" height={600} width={600} alt="Explore" />
      <CreateWorkspace />
    </div>
  );
}
