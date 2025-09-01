import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

// Create a Checkout Session using an existing Stripe Price ID.
// Request body:
// {
//   priceId: string;                  // required, e.g. "price_123"
//   quantity?: number;                // default 1
//   mode?: 'payment'|'subscription';  // default 'payment'
//   successPath?: string;             // default '/success?session_id={CHECKOUT_SESSION_ID}'
//   cancelPath?: string;              // default '/'
//   metadata?: Record<string, string> // optional, e.g. { product: 'id', ghlTag: 'tag' }
// }
export async function POST(request: NextRequest) {
  try {
    const {
      priceId,
      quantity = 1,
      mode = 'payment',
      successPath,
      cancelPath,
      metadata = {},
    } = await request.json();

    if (!priceId || typeof priceId !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid priceId' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode,
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      success_url:
        successPath?.includes('{CHECKOUT_SESSION_ID}')
          ? `${baseUrl}${successPath}`
          : `${baseUrl}${successPath || '/success'}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${cancelPath || '/'}`,
      metadata,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe checkout-by-price error:', error);
    const message = (error && (error.message || error.error?.message)) || 'Failed to create session';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
