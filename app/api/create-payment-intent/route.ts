import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-12-18.acacia" as any,
});

export async function POST(req: Request) {
  try {
    const { amount, metadata } = await req.json();

    // Create a PaymentIntent with the specified amount and metadata (for Lulu later)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to cents
      currency: "usd",
      metadata: {
        ...metadata,
        project: "ECHOES OF IRELAND: TRADITION, DEATH, AND THE LIVING LANDSCAPE",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    console.error("Stripe Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
