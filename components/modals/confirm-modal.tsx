'use client';

import { useModal } from '@/hooks/use-modal';

import Loading from '@/components/shared-ui/loading';
import { DialogModal } from '@/components/shared-ui/dialog-modal';
import { Button } from '@/components/ui/button';


export const ConfirmModal = () => {
  const { type, data, isOpen, onClose } = useModal();

  const modalOpen = type === 'confirm' && isOpen;
  const { title = '', description = '', onConfirm, isLoading } = data?.confirm || {};

  const modalBody = (
    <p className="text-md text-rose-500 font-semibold">
      This Can Not Be Recovered!
    </p>
  );

  const modalFooter = (
    <div className="flex justify-between items-center w-full">
      <Button disabled={isLoading} variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
        Confirm
      </Button>
    </div>
  );

  if (isLoading) {
    return <Loading />;
  }


  return (
    <DialogModal
      title={title}
      description={description}
      body={modalBody}
      footer={modalFooter}
      isOpen={modalOpen}
      onClose={onClose}
    />
  );
};
