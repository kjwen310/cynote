'use server';

import { db } from '@/lib/prisma/db';
import { getCurrentUser } from '@/actions/auth/get-current-user';
import { InputType, OutputType } from './types';
import { revalidatePath } from 'next/cache';
import { absoluteUrl, createSafeAction } from '@/lib/utils';
import { StripeRedirectSchema } from './schema';
import { stripe } from '@/lib/stripe';

const handler = async (data: InputType): Promise<OutputType> => {
  const { data: userData } = await getCurrentUser();
  const authUser = userData?.user || null;

  if (!authUser) {
    return {
      error: 'UnAuthorized',
    };
  }

  const { workspaceId } = data;

  const returnUrl = absoluteUrl(`/workspace/${workspaceId}`);
  let url = '';

  try {
    const subscription = await db.subscription.findUnique({
      where: {
        workspaceId,
      },
    });

    if (subscription && subscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: returnUrl,
      });

      url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: returnUrl,
        cancel_url: returnUrl,
        payment_method_types: ['card'],
        mode: "subscription",
        billing_address_collection: 'auto',
        customer_email: authUser.email,
        line_items: [
          {
            price_data: {
              currency: 'USD',
              product_data: {
                name: 'Cynote Subscription',
                description: 'Fully Access for Cynote',
              },
              unit_amount: 1000,
              recurring: {
                interval: 'month',
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          workspaceId,
        },
      });

      url = stripeSession.url || '';
    }
  } catch(error) {
    return {
      error: `STRIPE_REDIRECT_ERROR: ${error}`,
    };
  }

  revalidatePath(`/workspace/${workspaceId}`);
  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirectSchema, handler);
