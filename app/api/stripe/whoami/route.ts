import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const acctSelector = url.searchParams.get('acct'); // 'alt' to use STRIPE_SECRET_KEY_ALT
    const secretKey = acctSelector === 'alt' ? process.env.STRIPE_SECRET_KEY_ALT : process.env.STRIPE_SECRET_KEY;
    if (!secretKey) return NextResponse.json({ success: false, error: 'Missing Stripe secret key' }, { status: 500 });
    const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' });
    const acct = await stripe.accounts.retrieve();
    return NextResponse.json({
      success: true,
      accountId: acct.id,
      email: (acct as any).email,
      business_profile: (acct as any).business_profile,
      settings: { dashboard: (acct as any).settings?.dashboard },
      keyMode: secretKey.startsWith('sk_live_') ? 'live' : 'test',
    });
  } catch (e: any) {
    return NextResponse.json({ success: false, error: e?.message || 'Failed' }, { status: 500 });
  }
}
