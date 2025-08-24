# Recipe: Add New Product

Step-by-step guide to add a new product with Stripe integration and checkout flow.

## Prerequisites
- Stripe account with products created
- Access to Stripe Dashboard for product/price IDs
- GoHighLevel account (optional, for CRM integration)

## Steps

### 1. Create Product in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to Products
3. Create new product
4. Note the Product ID (e.g., `prod_XXX`)
5. Create a price and note the Price ID (e.g., `price_XXX`)

### 2. Add Product to Catalog

Edit `data/products.ts`:

```typescript
export const products = {
  // Existing products...
  
  'your-product-slug': {  // URL-friendly identifier
    name: 'Your Product Name',
    stripeProductId: 'prod_XXX',  // From Stripe Dashboard
    stripePriceId: 'price_XXX',    // From Stripe Dashboard
    price: 29.99,                  // Display price
    description: 'Brief product description for checkout',
    ghlTag: 'purchase-your-product-stripe', // Tag for GHL automation
  },
}
```

### 3. Create Product Content Page

Create `content/products/your-product.md`:

```markdown
---
slug: "products/your-product-slug"
title: "Your Product Name - Complete Solution"
description: "SEO-optimized description of your product"
price: 29.99
features:
  - "Feature 1"
  - "Feature 2"
  - "Feature 3"
image: "/images/products/your-product.jpg"
---

## What is Your Product?

Detailed description of your product...

## Key Features

### Feature 1
Explanation of feature 1...

### Feature 2
Explanation of feature 2...

## How It Works

1. Step one
2. Step two
3. Step three

## Pricing

**$29.99** - One-time purchase

## Get Started

[Buy Now](/checkout/your-product-slug)
```

### 4. Create Product Page Component (Optional)

For custom product pages, create `app/products/[slug]/page.tsx`:

```typescript
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';

export default function ProductPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const product = products[params.slug as keyof typeof products];
  
  if (!product) {
    return <div>Product not found</div>;
  }
  
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
      <p className="text-xl mb-8">{product.description}</p>
      
      <div className="bg-card p-6 rounded-lg">
        <div className="text-3xl font-bold mb-4">
          ${product.price}
        </div>
        
        <CheckoutButton productId={params.slug} />
      </div>
    </div>
  );
}
```

### 5. Add Checkout Button Component

Create or use existing checkout component:

```typescript
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export function CheckoutButton({ 
  productId,
  testMode = false 
}: { 
  productId: string;
  testMode?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  
  const handleCheckout = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, testMode }),
      });
      
      const { url } = await response.json();
      window.location.href = url;
      
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Button 
      onClick={handleCheckout}
      disabled={loading}
      size="lg"
      className="w-full"
    >
      {loading ? 'Processing...' : 'Buy Now'}
    </Button>
  );
}
```

### 6. Test Checkout Flow

Test with test mode first:

```typescript
// In your test page
<CheckoutButton productId="your-product-slug" testMode={true} />
```

1. Click checkout button
2. Complete Stripe checkout (use test card: 4242 4242 4242 4242)
3. Verify redirect to success page
4. Check GHL for contact creation/update

### 7. Configure Success Page

The success page handles post-purchase actions:

```typescript
// app/success/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [syncing, setSyncing] = useState(true);
  
  useEffect(() => {
    if (sessionId) {
      // Sync to GHL
      fetch('/api/sync-to-ghl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
      .then(() => setSyncing(false))
      .catch(console.error);
    }
  }, [sessionId]);
  
  return (
    <div className="container py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Thank You for Your Purchase!
      </h1>
      <p className="text-xl">
        Check your email for product access details.
      </p>
      {syncing && <p className="mt-4">Setting up your account...</p>}
    </div>
  );
}
```

## Example: Complete Product Setup

### 1. Product Catalog Entry

```typescript
// data/products.ts
export const products = {
  'seo-toolkit': {
    name: 'SEO Toolkit Pro',
    stripeProductId: 'prod_P3x4mpl3ID',
    stripePriceId: 'price_1Ex4mpl3Pr1c3',
    price: 97.00,
    description: 'Complete SEO toolkit with keyword research, backlink analysis, and rank tracking',
    ghlTag: 'purchase-seo-toolkit-stripe',
  },
}
```

### 2. Product Landing Page

```markdown
---
slug: "products/seo-toolkit"
title: "SEO Toolkit Pro - Complete SEO Solution"
description: "Professional SEO tools for keyword research, backlink analysis, and rank tracking"
price: 97.00
features:
  - "Keyword Research Tool"
  - "Backlink Analyzer"
  - "Rank Tracker"
  - "Site Audit"
  - "Competitor Analysis"
---

## Transform Your SEO Strategy

SEO Toolkit Pro gives you everything you need...
```

## Testing Checklist

- [ ] Product appears in Stripe Dashboard
- [ ] Checkout button triggers Stripe checkout
- [ ] Test purchase completes successfully
- [ ] Success page displays correctly
- [ ] GHL contact is created/updated
- [ ] Appropriate tags are applied in GHL
- [ ] Email notifications are sent

## Common Issues and Solutions

### Issue: Checkout Fails
**Solution:** 
1. Verify Stripe API keys in `.env`
2. Check product/price IDs match Stripe
3. Ensure product exists in `data/products.ts`

### Issue: GHL Sync Fails
**Solution:**
1. Check GHL API credentials
2. Verify location ID is correct
3. Ensure tags exist in GHL
4. Check API response in console

### Issue: Price Mismatch
**Solution:**
1. Update price in both Stripe and `products.ts`
2. Clear any cached data
3. Verify currency settings

## Environment Variables

Required in `.env.local`:

```env
# Stripe
STRIPE_SECRET_KEY=sk_test_xxx  # or sk_live_xxx for production
STRIPE_WEBHOOK_SECRET=whsec_xxx

# GoHighLevel
GHL_API_BASE_URL=https://rest.gohighlevel.com/v1
GHL_PAT_LOCATION=your_pat_token
GHL_LOCATION_ID=your_location_id

# Site
NEXT_PUBLIC_URL=http://localhost:3000  # or production URL
```

## Related Files
- `data/products.ts` - Product catalog
- `app/api/checkout/route.ts` - Checkout API
- `app/api/sync-to-ghl/route.ts` - GHL sync API
- `app/success/page.tsx` - Success page
- `content/products/` - Product content pages

## See Also
- [Add API Endpoint](./add-api-endpoint.md)
- [Module: Stripe Integration](../modules/stripe-integration.md)
- [Module: GHL Integration](../modules/ghl-integration.md)