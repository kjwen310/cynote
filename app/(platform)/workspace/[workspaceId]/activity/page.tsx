import { Suspense } from 'react';
import { Separator } from '@/components/ui/separator';
import { ActivityList } from './_components/activity-list';
import { ActivityIcon } from 'lucide-react';

interface ActivityPageProps {
  params: { workspaceId: string };
}

export default function ActivityPage({ params }: ActivityPageProps) {
  const { workspaceId } = params;
  return (
    <div className="w-full">
      <div className="flex space-x-4">
        <ActivityIcon className="w-6 h-6" />
        <p>Activity</p>
      </div>
      <Separator className="my-4" />
      <Suspense fallback={<ActivityList.Skeleton />}>
        <ActivityList workspaceId={workspaceId} />
      </Suspense>
    </div>
  );
}
