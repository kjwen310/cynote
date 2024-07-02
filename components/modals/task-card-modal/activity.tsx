'use client';

import { ActivityIcon } from 'lucide-react';
import { HistoryLog } from '@prisma/client';

import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ActivityItem } from '@/components/shared-ui/activity-item';

interface ActivityProps {
  historyLogs: HistoryLog[];
}

export const Activity = ({ historyLogs }: ActivityProps) => {
  return (
    <ScrollArea className="max-h-[150px]">
      <div className="flex items-start gap-x-3 w-full">
        <ActivityIcon className="w-5 h-5 mt-0.5" />
        <div className="w-full">
          <p className="font-semibold text-neutral-700 mb-2">Activity</p>
          <ol className="space-y-4 mt-2">
            {historyLogs.map((log) => (
              <ActivityItem key={log.id} log={log} />
            ))}
          </ol>
        </div>
      </div>
    </ScrollArea>
  );
};

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex items-start gap-x-3 w-full">
      <Skeleton className="w-6 h-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="w-24 h-6 bg-neutral-200 mb-2" />
        <Skeleton className="w-full h-10 bg-neutral-200" />
      </div>
    </div>
  );
};
