'use client';

import { useModal } from '@/hooks/use-modal';
import { DialogModal } from '@/components/dialog-modal';

export const ConfirmModal = () => {
  const { type, data, isOpen, onClose } = useModal();

  const modalOpen = type === 'confirm' && isOpen;
  const { title = '', description = '' } = data?.confirm || {};

  return (
    <DialogModal
      title={title}
      description={description || 'This can not be recovered!'}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
