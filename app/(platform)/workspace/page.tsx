import { Button } from '@/components/ui/button';

export default function WorkspacePage() {
  return (
    <div className="w-full flex justify-center items-center">
      {/* if there is workspace, show welcome UI */}
      {/* <span>
        Welcome!
      </span> */}
      {/* if there's no workspace, show create button */}
      <Button
        size="lg"
        className="w-auto h-8 rounded-sm px-2 py-1.5 md:block"
      >
        Create Your Workspace
      </Button>
    </div>
  );
}
