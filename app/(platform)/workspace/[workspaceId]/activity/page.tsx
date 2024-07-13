import { ActivityIcon } from 'lucide-react';

import { db } from '@/lib/prisma/db';
import { ActivityList } from './_components/activity-list';
import { CoverImage } from './_components/cover-image';

interface ActivityPageProps {
  params: { workspaceId: string };
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { workspaceId } = params;

  const workspace = await db.workspace.findUnique({
    where: {
      id: workspaceId,
    },
    select: {
      imageLgUrl: true,
    },
  });

  return (
    <div className="space-y-4 pb-8">
      <CoverImage imageUrl={workspace?.imageLgUrl || ''} />
      <div className="space-y-8 px-8">
        <div className="flex items-center gap-x-4">
          <ActivityIcon className="w-5 h-5 flex-shrink-0 text-zinc-500 dark:text-zinc-300" />
          <h2 className="text-xl font-semibold">Workspace Activities</h2>
        </div>

        <ActivityList workspaceId={workspaceId} />
      </div>
    </div>
  );
}
