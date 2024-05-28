'use client';

import { useModal } from '@/hooks/use-modal';
import { DialogModal } from '@/components/dialog-modal';

export const WorkspaceSettingModal = () => {
  const { type, data, isOpen, onClose } = useModal();
  const modalOpen = type === 'workspaceSetting' && isOpen;
  const { workspace } = data;

  const modalBody = (
    <div className="space-y-4 p-6">
      {workspace?.title}
      {workspace?.description}
    </div>
  );

  return (
    <DialogModal
      title="Settings"
      body={modalBody}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
