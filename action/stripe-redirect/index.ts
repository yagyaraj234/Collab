"use server";

import { db } from "@/lib/db";
import { InputType, OutputType } from "./types";
import { auth, currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { StripeRedirect } from "./schema";
import { absoluteUrl } from "@/lib/utils";
import { stripe } from "@/lib/stripe";

// import { OrgSubscription } from "@prisma/client";

const handler = async (data: InputType): Promise<OutputType> => {
  const { userId, orgId } = auth();

  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "Unauthorized",
    };
  }

  const settingUrl = absoluteUrl(`/organization/${orgId}`);

  let url;
  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeSubscriptionId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
          customer: orgSubscription.stripeCustomerId!,
          return_url: settingUrl,
        }),
        url = stripeSession.url;
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingUrl,
        cancel_url: settingUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Collab Pro",
                description: "Unlimited boards within your organization",
              },
              unit_amount: 4900,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          orgId,
        },
      });
      url = stripeSession.url || "";
    }
  } catch (error) {
    return {
      error: "Something went wrong!",
    };
  }

  revalidatePath(`/organization/${orgId}`);
  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);
