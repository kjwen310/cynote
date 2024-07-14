'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Check } from 'lucide-react';

import { useModal } from '@/hooks/use-modal';
import { useAction } from '@/hooks/use-action';
import { stripeRedirect } from '@/actions/stripe/stripe-redirect';

import { DialogModal } from '@/components/shared-ui/dialog-modal';
import { Button } from '@/components/ui/button';

export const SubscriptionModal = () => {
  const { type, isOpen, onClose } = useModal();
  const modalOpen = type === 'subscription' && isOpen;

  const params = useParams();
  const { workspaceId } = params;

  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
  });

  const onClick = () => {
    execute({ workspaceId: workspaceId as string });
  };

  const modalBody = (
    <div className="space-y-4">
      <div className="relative flex justify-center items-center aspect-video">
        <Image
          fill
          src="/images/subscription.svg"
          alt="subscription"
          className="object-start"
        />
      </div>
      <h2 className="text-xl text-center font-semibold">
        Upgrade For Fully Access!
      </h2>
      <ul className="flex flex-col gap-y-2 font-semibold text-sm text-left text-[#87c0cd] p-4">
        <li className="flex justify-center items-center gap-x-2">
          <Check className="w-4 h-4" />
          <p>No Task Board Limits</p>
        </li>
        <li className="flex justify-center items-center gap-x-2">
          <Check className="w-4 h-4" />
          <p>No More Note Limits</p>
        </li>
        <li className="flex justify-center items-center gap-x-2">
          <Check className="w-4 h-4" />
          <p>Access All Features</p>
        </li>
      </ul>
      <Button disabled={isLoading} onClick={onClick} className="w-full">
        Upgrade
      </Button>
    </div>
  );

  return <DialogModal body={modalBody} isOpen={modalOpen} onClose={onClose} />;
};
