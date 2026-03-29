import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { neon } from "@neondatabase/serverless";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2024-12-18.acacia" as Stripe.LatestApiVersion,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Webhook verification failed";
    console.error("Webhook signature verification failed:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const sql = neon(process.env.DATABASE_URL || "");

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_email || session.metadata?.email;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      if (email) {
        // Get subscription details to determine plan type
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const priceId = subscription.items.data[0]?.price?.id || "";
        const interval = subscription.items.data[0]?.price?.recurring?.interval;
        const planType = interval === "year" ? "pro_annual" : "pro_monthly";

        await sql`
          INSERT INTO users (email, stripe_customer_id, subscription_id, subscription_status, plan_type)
          VALUES (${email}, ${customerId}, ${subscriptionId}, 'active', ${planType})
          ON CONFLICT (email) DO UPDATE SET
            stripe_customer_id = ${customerId},
            subscription_id = ${subscriptionId},
            subscription_status = 'active',
            plan_type = ${planType},
            updated_at = NOW()
        `;
        console.log(`[STRIPE] Subscription activated: ${email} (${planType})`);
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      const status = subscription.status;
      const subscriptionId = subscription.id;

      await sql`
        UPDATE users SET subscription_status = ${status}, updated_at = NOW()
        WHERE subscription_id = ${subscriptionId}
      `;
      console.log(`[STRIPE] Subscription updated: ${subscriptionId} → ${status}`);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const subscriptionId = subscription.id;

      await sql`
        UPDATE users SET subscription_status = 'canceled', plan_type = 'free', updated_at = NOW()
        WHERE subscription_id = ${subscriptionId}
      `;
      console.log(`[STRIPE] Subscription canceled: ${subscriptionId}`);
      break;
    }
  }

  return NextResponse.json({ received: true });
}
