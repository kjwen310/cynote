import { CreateTaskBoard } from '../../_components/create-taskboard';

export default function WorkspaceIdPage() {
  return (
    <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
      <div className="flex flex-col justify-center items-center gap-y-1 relative w-full bg-muted rounded-sm aspect-video transition cursor-pointer hover:opacity-75">
        <CreateTaskBoard />
      </div>
    </div>
  );
}
