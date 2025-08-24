import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { products } from '@/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST() {
  try {
    // Use real Skool Video Downloader product
    const product = products['skool-video-downloader'];
    const useTestPrice = true; // Toggle this for testing
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // For testing, create price dynamically
          ...(useTestPrice ? {
            price_data: {
              currency: 'usd',
              product: product.stripeProductId,
              unit_amount: 50, // $0.50 in cents (Stripe minimum)
            }
          } : {
            price: product.stripePriceId
          }),
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/test-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/test-stripe`,
      metadata: {
        product: 'skool-video-downloader',
        ghlTrigger: product.ghlTag,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}