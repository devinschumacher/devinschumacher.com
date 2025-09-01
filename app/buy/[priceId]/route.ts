import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// GET /buy/:priceId?ghlTag=...&quantity=1&mode=payment&successPath=/success?session_id={CHECKOUT_SESSION_ID}&cancelPath=/
export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ priceId: string }> } | { params: { priceId: string } }
) {
  try {
    // Support Next.js versions where params may be a Promise
    const p: any = (ctx as any).params;
    const { priceId } = typeof p.then === 'function' ? await p : p;
    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
    }

    const url = new URL(request.url);
    const acctSelector = url.searchParams.get('acct'); // 'alt' to use STRIPE_SECRET_KEY_ALT
    const quantity = Math.max(1, parseInt(url.searchParams.get('quantity') || '1', 10));
    const mode = (url.searchParams.get('mode') || 'payment') as 'payment' | 'subscription';
    const ghlTag = url.searchParams.get('ghlTag') || undefined;
    const successPath = url.searchParams.get('successPath') || '/success?session_id={CHECKOUT_SESSION_ID}';
    const cancelPath = url.searchParams.get('cancelPath') || '/';
    const allowPromotionCodes = url.searchParams.get('allowPromo') === '1';
    const coupon = url.searchParams.get('coupon') || undefined; // e.g., cou_...
    const promotionCode = url.searchParams.get('promo') || undefined; // e.g., promo_...
    const code = url.searchParams.get('code') || undefined; // human-readable code value

    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    const secretKey = acctSelector === 'alt' ? process.env.STRIPE_SECRET_KEY_ALT : process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe secret key not configured' }, { status: 500 });
    }
    const stripe = new Stripe(secretKey, { apiVersion: '2024-12-18.acacia' });

    // If a human-readable code (e.g., FREE100) was provided, try to resolve it
    let resolvedPromotionCode: string | undefined = promotionCode;
    if (!resolvedPromotionCode && code) {
      // First, try exact lookup via filter
      let list = await stripe.promotionCodes.list({ code, active: true, limit: 1 });
      if (list.data.length === 0) {
        // Fallback: fetch a page of active codes and match case-insensitive
        list = await stripe.promotionCodes.list({ active: true, limit: 100 });
        const match = list.data.find((pc) => (pc.code || '').toLowerCase() === code.toLowerCase());
        if (match) {
          resolvedPromotionCode = match.id;
        }
      } else {
        resolvedPromotionCode = list.data[0].id;
      }

      if (!resolvedPromotionCode) {
        return NextResponse.json({
          error: `Promotion code '${code}' not found or not active. If you only created a Coupon, pass coupon=cou_... instead or create a Promotion Code for this coupon.`,
        }, { status: 400 });
      }
    }

    const discounts = resolvedPromotionCode
      ? [{ promotion_code: resolvedPromotionCode }]
      : coupon
      ? [{ coupon }]
      : undefined;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode,
      line_items: [
        {
          price: priceId,
          quantity,
        },
      ],
      success_url: successPath.includes('{CHECKOUT_SESSION_ID}')
        ? `${baseUrl}${successPath}`
        : `${baseUrl}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}${cancelPath}`,
      // Stripe forbids specifying both allow_promotion_codes and discounts.
      ...(discounts ? { discounts } : { allow_promotion_codes: allowPromotionCodes }),
      metadata: {
        ...(ghlTag ? { ghlTag } : {}),
      },
    });

    if (!session.url) {
      return NextResponse.json({ error: 'No session URL returned by Stripe' }, { status: 500 });
    }

    return NextResponse.redirect(session.url);
  } catch (error: any) {
    const message = (error && (error.message || error.error?.message)) || 'Failed to create session';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
