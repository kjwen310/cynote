'use client';

import { useParams } from 'next/navigation';
import { Copy, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TaskCardWithTaskList } from '@/types';
import { copyTaskCard, deleteTaskCard } from '@/actions/task';
import { useCardModal } from '@/hooks/use-card-modal';
import { useToast } from '@/components/ui/use-toast';

interface ActionProps {
  card: TaskCardWithTaskList;
}

export const Action = ({ card }: ActionProps) => {
const { toast } = useToast();
  const params = useParams();
  const { workspaceId } = params;

  const onClose = useCardModal((state) => state.onClose);

  const handleCopyCard = async () => {
    const result = await copyTaskCard({
      cardId: card.id,
      workspaceId: workspaceId as string,
    });
    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        title: 'ERROR',
        description: error.message,
      });
    } else {
      toast({
        title: 'SUCCESS',
        description: 'Copied Card',
      });
    }

    onClose();
  };

  const handleDeleteCard = async () => {
    const result = await deleteTaskCard({
      cardId: card.id,
      workspaceId: workspaceId as string,
    });
    const { error } = JSON.parse(result);

    if (error?.message) {
      toast({
        title: 'ERROR',
        description: error.message,
      });
    } else {
      toast({
        title: 'SUCCESS',
        description: 'Deleted Card',
      });
    }

    onClose();
  };

  return (
    <div className="space-y-2 mt-2">
      <p className="text-xs font-semibold">Actions</p>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start"
        onClick={handleCopyCard}
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-full justify-start"
        onClick={handleDeleteCard}
      >
        <Trash className="w-4 h-4 mr-2" />
        Delete
      </Button>
    </div>
  );
};

Action.Skeleton = function ActionSkeleton() {
  return (
    <div className="space-y-2 mt-2">
      <Skeleton className="w-20 h-4 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
      <Skeleton className="w-full h-8 bg-neutral-200" />
    </div>
  );
};
