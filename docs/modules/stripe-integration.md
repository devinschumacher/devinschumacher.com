# Module: Stripe Integration

Complete documentation for the Stripe payment processing integration.

## Overview

This module handles all payment processing through Stripe, including checkout sessions, payment handling, and webhook processing.

## Related Files
- `app/api/checkout/route.ts` - Main checkout API
- `app/api/test-checkout/route.ts` - Test mode checkout
- `app/api/checkout-by-price/route.ts` - Checkout using an existing Stripe Price ID (incl. GHL-created)
- `data/products.ts` - Product catalog with Stripe IDs
- `app/success/page.tsx` - Payment success handler
- `app/test-stripe/page.tsx` - Stripe testing interface

## Architecture

```
User → Checkout Button → /api/checkout → Stripe Session → Stripe Checkout
                                              ↓
                                    Success → /success page
                                              ↓
                                    /api/sync-to-ghl → GHL CRM
```

## Configuration

### Environment Variables

```env
# Required
STRIPE_SECRET_KEY=sk_test_xxx  # Test key for development
STRIPE_SECRET_KEY=sk_live_xxx  # Live key for production

# Optional
STRIPE_WEBHOOK_SECRET=whsec_xxx  # For webhook verification
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_xxx  # For client-side
```

### Stripe SDK Initialization

```typescript
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});
```

## Core Components

### 1. Product Catalog

```typescript
// data/products.ts
export const products = {
  'product-id': {
    name: 'Product Name',
    stripeProductId: 'prod_XXX',  // Stripe Product ID
    stripePriceId: 'price_XXX',    // Stripe Price ID
    price: 29.99,                  // Display price
    description: 'Product description',
    ghlTag: 'purchase-tag',        // CRM tag
  },
}
```

### 2. Checkout Session Creation

```typescript
// app/api/checkout/route.ts
const session = await stripe.checkout.sessions.create({
  payment_method_types: ['card'],
  line_items: [
    {
      price: product.stripePriceId,
      quantity: 1,
    },
  ],
  mode: 'payment',
  success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
  cancel_url: `${baseUrl}/products/${productId}`,
  metadata: {
    product: productId,
    ghlTag: product.ghlTag,
  },
});
```

### 3. Test Mode Implementation

```typescript
// For testing with $0.50 price
const testSession = await stripe.checkout.sessions.create({
  line_items: [
    {
      price_data: {
        currency: 'usd',
        product: product.stripeProductId,
        unit_amount: 50, // $0.50 in cents
      },
      quantity: 1,
    },
  ],
  // ... rest of config
});
```

### 4. Session Retrieval

```typescript
const session = await stripe.checkout.sessions.retrieve(sessionId, {
  expand: ['customer', 'line_items'],
});

// Access customer data
const customerEmail = session.customer_details?.email;
const customerName = session.customer_details?.name;
const amount = session.amount_total! / 100; // Convert cents to dollars
```

## Payment Flows

### Standard Purchase Flow

1. User clicks "Buy Now" button
2. Frontend calls `/api/checkout` with product ID
3. API creates Stripe session
4. User redirected to Stripe Checkout
5. Payment processed by Stripe
6. User redirected to success page
7. Success page syncs to CRM

### Test Mode Flow

1. Enable test mode in checkout button
2. API uses test price ($0.50)
3. Use test card: 4242 4242 4242 4242
4. Complete checkout
5. Verify in Stripe Dashboard (test mode)

## Webhook Handling

### Setup Webhook Endpoint

```typescript
// app/api/stripe-webhook/route.ts
export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;
  
  let event: Stripe.Event;
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json(
      { error: 'Invalid signature' },
      { status: 400 }
    );
  }
  
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      await handleSuccessfulPayment(session);
      break;
      
    case 'payment_intent.failed':
      const paymentIntent = event.data.object;
      await handleFailedPayment(paymentIntent);
      break;
      
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
  
  return NextResponse.json({ received: true });
}
```

### Configure Webhook in Stripe

1. Go to Stripe Dashboard → Webhooks
2. Add endpoint: `https://yourdomain.com/api/stripe-webhook`
3. Select events to listen for
4. Copy webhook signing secret to env

## Error Handling

### Common Errors and Solutions

```typescript
try {
  const session = await stripe.checkout.sessions.create(config);
  return NextResponse.json({ url: session.url });
} catch (error) {
  if (error instanceof Stripe.errors.StripeError) {
    switch (error.type) {
      case 'StripeCardError':
        return NextResponse.json(
          { error: 'Card was declined' },
          { status: 400 }
        );
      case 'StripeInvalidRequestError':
        return NextResponse.json(
          { error: 'Invalid request' },
          { status: 400 }
        );
      default:
        return NextResponse.json(
          { error: 'Payment failed' },
          { status: 500 }
        );
    }
  }
  
  return NextResponse.json(
    { error: 'Unexpected error' },
    { status: 500 }
  );
}
```

## Testing

### Test Cards

```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
Requires Auth: 4000 0025 0000 3155
```

### Test Scenarios

1. **Successful Payment**
   - Use test card
   - Complete checkout
   - Verify success page
   - Check Stripe Dashboard

2. **Failed Payment**
   - Use decline card
   - Verify error handling
   - Check user experience

3. **Abandoned Checkout**
   - Start checkout
   - Close window
   - Verify no charge

## Security Best Practices

1. **Never expose secret keys** - Use environment variables
2. **Verify webhook signatures** - Prevent replay attacks
3. **Validate product IDs** - Check against catalog
4. **Use HTTPS only** - Encrypt payment data
5. **Log but don't expose errors** - Security through obscurity
6. **Implement rate limiting** - Prevent abuse
7. **Validate amounts** - Prevent price manipulation

## Monitoring

### Key Metrics

- Checkout session creation rate
- Conversion rate (sessions → payments)
- Failed payment rate
- Average transaction value
- Payment method distribution

### Logging

```typescript
console.log('Checkout session created:', {
  sessionId: session.id,
  productId: productId,
  amount: session.amount_total,
  customerEmail: session.customer_email,
});
```

## Troubleshooting

### Session Creation Fails
- Verify API keys
- Check product/price IDs exist
- Ensure proper network connectivity

### Redirect Issues
- Verify success/cancel URLs
- Check for URL encoding issues
- Ensure HTTPS in production

### Webhook Not Receiving
- Verify endpoint URL
- Check webhook secret
- Ensure proper response (200 status)

## Migration Guide

### From Test to Production

1. Update Stripe API key to live key
2. Create products in live mode
3. Update product IDs in catalog
4. Test with real payment
5. Monitor first transactions
6. Update webhook endpoint

## See Also
- [Recipe: Add Product](../recipes/add-product.md)
- [Module: GHL Integration](./ghl-integration.md)
- [API Route Pattern](../patterns/api-route-pattern.md)
