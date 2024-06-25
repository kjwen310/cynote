'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons/Icon';
import { useAction } from '@/hooks/use-action';
import { fetchHistoryLog } from '@/actions/historyLog/fetch-history-log';
import { useToast } from '@/components/ui/use-toast';
import { HistoryLog } from '@prisma/client';
import { ActivityItem } from '@/components/activity-item';

let page = 2;

export const LoadMore = () => {
  const { ref, inView } = useInView();
  const [data, setData] = useState<HistoryLog[]>([]);
  const [totalCount, setTotalCount] = useState<number | undefined>(undefined);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const { toast } = useToast();

  const params = useParams();
  const { workspaceId } = params;

  const { execute } = useAction(fetchHistoryLog, {
    onSuccess: (historyLogData) => {
      const { data: newData, count } = historyLogData;
      setTotalCount(count);
      setData([...data, ...newData]);
      page++;
    },
    onError: (error) => {
      toast({
        title: 'ERROR',
        description: 'Something went wrong',
      });
    },
  });

  useEffect(() => {
    if (inView && totalCount !== undefined && totalCount > page * 10) {
      execute({ workspaceId: workspaceId as string, page });
    } else {
      setCanLoadMore(false);
    }
  }, [inView, data]);
  return (
    <>
      {data.map((log: HistoryLog) => (
        <ActivityItem key={log.id} log={log} />
      ))}
      <div ref={ref} className="w-full flex justify-center items-center">
        <Icons.spinner
          className={cn('w-4 h-4 animate-spin', !canLoadMore && 'hidden')}
        />
      </div>
    </>
  );
};