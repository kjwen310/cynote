'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCardModal } from '@/hooks/use-card-modal';
import { TaskCardWithTaskList } from '@/types';
import { fetcher } from '@/lib/fetcher';
import { Header } from './header';

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
      </DialogContent>
    </Dialog>
  );
};
