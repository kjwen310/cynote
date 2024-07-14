import { db } from '@/lib/prisma/db';

const DAY_IN_MS = 84_400_000;

export const checkSubscription = async (workspaceId: string) => {
  if (!workspaceId) {
    return false;
  }

  const subscription = await db.subscription.findUnique({
    where: {
      workspaceId,
    },
    select: {
      stripeSubscriptionId: true,
      stripeCustomerId: true,
      stripePriceId: true,
      stripeCurrentPeriodEnd: true,
    },
  });

  if (!subscription) {
    return false;
  }

  const isValid =
    subscription.stripePriceId &&
    subscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  return !!isValid;
};
