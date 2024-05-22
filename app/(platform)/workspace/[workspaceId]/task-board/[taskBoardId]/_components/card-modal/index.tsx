'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCardModal } from '@/hooks/use-card-modal';
import { TaskCardWithTaskList } from '@/types';
import { fetcher } from '@/lib/fetcher';
import { Header } from './header';
import { Body } from './body';
import { Action } from './action';

export const CardModal = () => {
  const id = useCardModal((state) => state.id);
  const isOpen = useCardModal((state) => state.isOpen);
  const onOpen = useCardModal((state) => state.onOpen);
  const onClose = useCardModal((state) => state.onClose);

  const params = useParams();
  const { workspaceId } = params;

  const { data: cardData } = useQuery<TaskCardWithTaskList>({
    queryKey: ['card', id],
    queryFn: () => fetcher(`/api/card/${id}/${workspaceId}`),
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        {cardData ? <Header card={cardData} /> : <Header.Skeleton />}
        <div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
          <div className="col-span-3">
            <div className="w-full space-y-6">
              {cardData ? <Body card={cardData} /> : <Body.Skeleton />}
            </div>
          </div>
          {cardData ? <Action card={cardData} /> : <Action.Skeleton />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
