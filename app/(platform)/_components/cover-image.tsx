'use client';

import Image from 'next/image';
import { Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/use-modal';
import { WorkspaceWithDetail } from '@/types';

interface CoverImageProps {
  workspace: WorkspaceWithDetail;
  isOwner: boolean;
}

export const CoverImage = ({ workspace, isOwner }: CoverImageProps) => {
  const { onOpen } = useModal();
  return (
    <div
      className={cn(
        'relative w-full h-[36vh] group',
        workspace.imageLgUrl ? 'bg-muted' : 'h-[12vh]'
      )}
    >
      {!!workspace.imageLgUrl && (
        <Image
          fill
          src={workspace.imageLgUrl}
          alt="task board cover image"
          className="object-cover"
        />
      )}
      {isOwner && (
        <div className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpen('workspaceSetting', { workspace, isOwner })}
            className="text-xs text-muted-foreground"
          >
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      )}
    </div>
  );
};
