# Recipe: Create a Stripe Price for an Existing Product

If your Stripe product has no prices (e.g., `prod_SgReFRh1TixiX4`), create one so it can be sold in Checkout.

## Endpoint
- POST `app/api/stripe/create-price/route.ts`

## One-time price example
```
POST /api/stripe/create-price
{
  "productId": "prod_SgReFRh1TixiX4",
  "type": "one_time",
  "unitAmount": 1700,
  "currency": "usd",
  "nickname": "Skool Downloader One-Time"
}
```

## Recurring price example
```
POST /api/stripe/create-price
{
  "productId": "prod_SgReFRh1TixiX4",
  "type": "recurring",
  "unitAmount": 2900,
  "currency": "usd",
  "interval": "month",
  "intervalCount": 1,
  "nickname": "Pro Monthly"
}
```

Response includes the created `price.id` (e.g., `price_123`). Use that with the checkout-by-price endpoint.

## Then start checkout by Price ID
```
POST /api/checkout-by-price
{
  "priceId": "price_123",
  "metadata": { "ghlTag": "purchase-my-product-stripe" }
}
```

Notes:
- Live vs Test depends on `STRIPE_SECRET_KEY` in your environment.
- You can also create prices in the Stripe Dashboard instead of this API.
- The success page syncs to GHL and will append any `metadata.ghlTag`.

