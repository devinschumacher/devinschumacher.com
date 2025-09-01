import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const acctSelector = url.searchParams.get('acct'); // 'alt' to use STRIPE_SECRET_KEY_ALT
  const secretKey = acctSelector === 'alt' ? process.env.STRIPE_SECRET_KEY_ALT : process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return NextResponse.json({ error: 'Missing Stripe secret key' }, { status: 500 });
  const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' });
  const priceId = url.searchParams.get('priceId');
  if (!priceId) return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
  try {
    const price = await stripe.prices.retrieve(priceId);
    return NextResponse.json({ success: true, price });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || 'Failed to retrieve price' }, { status: 400 });
  }
}
