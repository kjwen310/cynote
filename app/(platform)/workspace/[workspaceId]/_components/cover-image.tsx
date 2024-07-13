'use client';

import { Settings } from 'lucide-react';

import { useModal } from '@/hooks/use-modal';
import { WorkspaceWithDetail } from '@/types';
import { CoverImageContainer } from '@/components/shared-ui/cover-image-container';

interface CoverImageProps {
  workspace: WorkspaceWithDetail;
  isOwner: boolean;
}

export const CoverImage = ({ workspace, isOwner }: CoverImageProps) => {
  const { onOpen } = useModal();

  return (
    <CoverImageContainer
      imageUrl={workspace.imageLgUrl}
      showBtn={isOwner}
      btnText="Settings"
      btnIcon={<Settings className="w-4 h-4 mr-2" />}
      onClick={() => onOpen('workspaceSetting', { workspace, isOwner })}
    />
  );
};
