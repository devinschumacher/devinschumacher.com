import { NextResponse, NextRequest } from 'next/server';
import Stripe from 'stripe';
import { products } from '@/data/products';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: NextRequest) {
  try {
    const { productId, testMode = false } = await request.json();
    
    // Get product from catalog
    const product = products[productId as keyof typeof products];
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Use test price if in test mode
          ...(testMode ? {
            price_data: {
              currency: 'usd',
              product: product.stripeProductId,
              unit_amount: 50, // $0.50 test price
            }
          } : {
            price: product.stripePriceId
          }),
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/products/${productId}`,
      metadata: {
        product: productId,
        ghlTag: product.ghlTag,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}