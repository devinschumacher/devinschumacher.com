import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

/*
POST /api/stripe/create-price
Body (one-time):
{
  "productId": "prod_...",        // required
  "type": "one_time",             // default 'one_time'
  "unitAmount": 1700,              // required (cents)
  "currency": "usd",              // default 'usd'
  "nickname": "Skool Downloader"
}

Body (recurring):
{
  "productId": "prod_...",
  "type": "recurring",
  "unitAmount": 2900,
  "currency": "usd",
  "interval": "month",            // 'day' | 'week' | 'month' | 'year'
  "intervalCount": 1,
  "nickname": "Pro Monthly"
}
*/
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      productId,
      type = 'one_time',
      unitAmount,
      currency = 'usd',
      interval,
      intervalCount,
      nickname,
      active = true,
    } = body || {};

    if (!productId || typeof productId !== 'string') {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }
    if (typeof unitAmount !== 'number' || unitAmount <= 0) {
      return NextResponse.json({ error: 'unitAmount must be a positive number (in cents)' }, { status: 400 });
    }

    const params: Stripe.PriceCreateParams = {
      product: productId,
      currency,
      unit_amount: unitAmount,
      active,
      nickname,
    } as Stripe.PriceCreateParams;

    if (type === 'recurring') {
      if (!interval) {
        return NextResponse.json({ error: 'interval is required for recurring prices' }, { status: 400 });
      }
      params.recurring = {
        interval,
        interval_count: intervalCount,
      } as Stripe.PriceCreateParams.Recurring;
    }

    const price = await stripe.prices.create(params);
    return NextResponse.json({ success: true, price });
  } catch (err) {
    console.error('create-price error:', err);
    return NextResponse.json({ success: false, error: 'Failed to create price' }, { status: 500 });
  }
}

