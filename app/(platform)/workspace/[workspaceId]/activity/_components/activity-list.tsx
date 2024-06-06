import { ActivityItem } from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchHistoryLog } from '@/actions/historyLog/fetch-history-log';
import { HistoryLog } from '@prisma/client';
import { LoadMore } from '@/app/(platform)/workspace/[workspaceId]/activity/_components/load-more';

interface ActivityListProps {
  workspaceId: string;
}

export const ActivityList = async ({ workspaceId }: ActivityListProps) => {
  const result = await fetchHistoryLog({ workspaceId, page: 1 });
  const { data, count } = result?.data || {};

  if (!data || !count) {
    return (
      <p className="text-xs text-center text-muted-foreground">
        No Activity Found.
      </p>
    );
  }

  return (
    <ol className="space-y-4 mt-4">
      {data.map((log: HistoryLog) => (
        <ActivityItem key={log.id} log={log} />
      ))}
      <LoadMore />
    </ol>
  );
};

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="space-y-4 mt-4">
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[40%] h-14" />
      <Skeleton className="w-[60%] h-14" />
      <Skeleton className="w-[80%] h-14" />
      <Skeleton className="w-[70%] h-14" />
    </ol>
  );
};
