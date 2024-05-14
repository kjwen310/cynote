'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DialogModalProps {
  title: string;
  description: string;
  isOpen?: boolean;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  bodyClassName?: string;
  onClose: () => void;
}

export const DialogModal = ({
  title,
  description,
  isOpen,
  body,
  footer,
  bodyClassName,
  onClose,
}: DialogModalProps) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={bodyClassName}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>{body}</div>

        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
