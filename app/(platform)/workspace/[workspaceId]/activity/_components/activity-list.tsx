import { ActivityItem } from '@/components/activity-item';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchAllHistoryLog } from '@/actions/historyLog';
import { HistoryLog } from '@prisma/client';

interface ActivityListProps {
  workspaceId: string;
}

export const ActivityList = async ({ workspaceId }: ActivityListProps) => {
  const result = await fetchAllHistoryLog({ workspaceId });
  const historyLogs = JSON.parse(result);

  return (
    <ol className="space-y-4 mt-4">
      {!historyLogs?.length && (
        <p className="text-xs text-center text-muted-foreground">
          No Activity Found.
        </p>
      )}
      {historyLogs.map((log: HistoryLog) => (
        <ActivityItem key={log.id} log={log} />
      ))}
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
  )
}
