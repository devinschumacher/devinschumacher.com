# Recipe: Checkout by Existing Price ID

Use an existing Stripe Price (including those created by Go High Level) to create a Checkout Session directly.

## Endpoint
- POST `app/api/checkout-by-price/route.ts`

## Request Body
```
{
  "priceId": "price_123",            // required
  "quantity": 1,                      // optional, default 1
  "mode": "payment",                 // optional, 'payment' | 'subscription'
  "successPath": "/success?session_id={CHECKOUT_SESSION_ID}", // optional
  "cancelPath": "/products/foo",    // optional
  "metadata": {                       // optional, forwarded to Stripe session
    "product": "my-product",
    "ghlTag": "purchase-my-product-stripe"
  }
}
```

## Notes
- Pass the exact `priceId` from Stripe — if the product/price was created via Go High Level, it works the same.
- Any `metadata.ghlTag` you pass is appended as a tag in the GHL sync (`app/api/sync-to-ghl/route.ts`).
- Success URL defaults to `NEXT_PUBLIC_URL + '/success?session_id={CHECKOUT_SESSION_ID}'`.
- Cancel URL defaults to `NEXT_PUBLIC_URL + '/'`.
- Test vs Live depends on which Stripe API key you use.

## Example Fetch
```
await fetch('/api/checkout-by-price', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    priceId: 'price_ABC',
    metadata: { ghlTag: 'purchase-foo-stripe' }
  })
}).then(r => r.json()).then(({ url }) => window.location.href = url);
```

