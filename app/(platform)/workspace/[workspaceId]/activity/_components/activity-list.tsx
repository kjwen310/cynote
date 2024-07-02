'use client';

import { useState, useEffect } from 'react';
import { Collaborator, HistoryLog, LOG_TYPE } from '@prisma/client';
import { useInView } from 'react-intersection-observer';

import { useAction } from '@/hooks/use-action';
import { fetchHistoryLog } from '@/actions/historyLog/fetch-history-log';
import { fetchCollaborator } from '@/actions/collaborator/fetch-collaborator';

import { ActivityItem } from '@/components/shared-ui/activity-item';
import { Icons } from '@/components/shared-ui/Icon';
import { FilterSelect } from './filter-select';

interface ActivityListProps {
  workspaceId: string;
}

export const ActivityList = ({ workspaceId }: ActivityListProps) => {
  const [logData, setLogData] = useState<HistoryLog[]>([]);
  const [collaboratorData, setCollaboratorData] = useState<Collaborator[]>([]);

  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const [selectedType, setSelectedType] = useState<LOG_TYPE | 'all'>('all');
  const [selectedCollaborator, setSelectedCollaborator] = useState<
    string | 'all'
  >('all');

  const { ref, inView } = useInView();

  const { execute, isLoading } = useAction(fetchHistoryLog, {
    onSuccess: (historyLogData) => {
      const { data: newData, count } = historyLogData;

      if (count <= page * 10) {
        setCanLoadMore(false);
      }

      setLogData([...logData, ...newData]);
      setPage((prev) => prev + 1);
    },
  });

  const { execute: executeFetchCollaborator } = useAction(fetchCollaborator, {
    onSuccess: (data) => {
      setCollaboratorData(data);
    },
  });

  const loadMore = () => {
    if (isLoading || !canLoadMore) return;

    execute({
      workspaceId,
      page,
      ...(selectedType && selectedType !== 'all' && { type: selectedType }),
      ...(selectedCollaborator &&
        selectedCollaborator !== 'all' && {
          collaboratorId: selectedCollaborator,
        }),
    });
  };

  useEffect(() => {
    executeFetchCollaborator({ workspaceId });
  }, []);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  useEffect(() => {
    setPage(1);
    setLogData([]);
    setCanLoadMore(() => true);

    loadMore();
  }, [selectedType, selectedCollaborator]);

  if (!logData) {
    return (
      <p className="text-xs text-center text-muted-foreground">
        No Activity Found.
      </p>
    );
  }

  return (
    <>
      <FilterSelect
        collaborators={collaboratorData}
        setSelectedType={setSelectedType}
        setSelectedCollaborator={setSelectedCollaborator}
      />
      <ul className="space-y-4 mt-4">
        {logData.map((log: HistoryLog) => (
          <ActivityItem key={log.id} log={log} />
        ))}
      </ul>
      <div ref={ref} className="w-full h-12 flex justify-center items-center">
        {(canLoadMore || isLoading) && (
          <Icons.spinner className="w-12 h-12 animate-spin" />
        )}
      </div>
    </>
  );
};
