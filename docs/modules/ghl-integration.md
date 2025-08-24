# Module: GoHighLevel (GHL) Integration

Complete documentation for the GoHighLevel CRM integration that syncs Stripe purchases.

## Overview

This module handles synchronization of customer data from Stripe to GoHighLevel CRM, enabling automated marketing workflows and customer management.

## Related Files
- `app/api/sync-to-ghl/route.ts` - Main sync endpoint
- `app/success/page.tsx` - Triggers sync after purchase
- `data/products.ts` - Contains GHL tags for products

## Architecture

```
Stripe Purchase → Success Page → /api/sync-to-ghl → GHL API
                                        ↓
                              Check if contact exists
                                   ↓            ↓
                              Update      or   Create
                                   ↓            ↓
                              Apply tags & custom fields
```

## Configuration

### Environment Variables

```env
# Required
GHL_API_BASE_URL=https://rest.gohighlevel.com/v1
GHL_PAT_LOCATION=your_personal_access_token
GHL_LOCATION_ID=your_location_id

# Optional
GHL_WEBHOOK_URL=https://yourdomain.com/api/ghl-webhook
```

### GHL API Setup

1. Get Personal Access Token from GHL Settings
2. Note your Location ID
3. Configure custom fields (optional)
4. Set up automation workflows based on tags

## Core Implementation

### 1. Contact Data Structure

```typescript
interface GHLContact {
  locationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address1?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  tags: string[];
  source: string;
  customFields?: Array<{
    id: string;
    value: string;
  }>;
}
```

### 2. Sync Logic

```typescript
// app/api/sync-to-ghl/route.ts
export async function POST(request: Request) {
  const { sessionId } = await request.json();
  
  // Get Stripe session data
  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['customer', 'line_items'],
  });
  
  // Build contact data
  const contactData = {
    locationId: process.env.GHL_LOCATION_ID,
    firstName: customerName.split(' ')[0],
    lastName: customerName.split(' ').slice(1).join(' '),
    email: session.customer_details?.email,
    phone: session.customer_details?.phone,
    tags: [
      'stripe-purchase',
      `amount-${amountInDollars}`,
      `product-${productName}`,
      session.metadata?.ghlTag, // Product-specific tag
    ],
    source: 'Stripe Purchase',
  };
  
  // Check if contact exists
  const searchResponse = await fetch(
    `${GHL_API_BASE_URL}/contacts/lookup?email=${email}`,
    {
      headers: {
        'Authorization': `Bearer ${GHL_PAT_LOCATION}`,
        'Version': '2021-07-28',
      },
    }
  );
  
  if (searchResponse.ok) {
    const { contact } = await searchResponse.json();
    if (contact) {
      // Update existing contact
      await updateContact(contact.id, contactData);
    } else {
      // Create new contact
      await createContact(contactData);
    }
  }
}
```

### 3. Contact Creation

```typescript
async function createContact(data: GHLContact) {
  const response = await fetch(`${GHL_API_BASE_URL}/contacts/`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${GHL_PAT_LOCATION}`,
      'Content-Type': 'application/json',
      'Version': '2021-07-28',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    const error = await response.json();
    
    // Handle duplicate contact error
    if (error.meta?.contactId) {
      return updateContact(error.meta.contactId, data);
    }
    
    throw new Error(`Failed to create contact: ${error.message}`);
  }
  
  return response.json();
}
```

### 4. Contact Update

```typescript
async function updateContact(contactId: string, data: GHLContact) {
  // Remove locationId for updates
  const { locationId, ...updateData } = data;
  
  const response = await fetch(
    `${GHL_API_BASE_URL}/contacts/${contactId}`,
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GHL_PAT_LOCATION}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify(updateData),
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to update contact');
  }
  
  return response.json();
}
```

## Tag System

### Standard Tags

```typescript
const standardTags = [
  'stripe-purchase',           // Any Stripe purchase
  'payment-complete',          // Payment successful
  'live-purchase',            // Production purchase
  'test-purchase',            // Test mode purchase
  `amount-${amount}`,         // Purchase amount
  `currency-${currency}`,     // Payment currency
  `items-${itemCount}`,       // Number of items
  new Date().toISOString().split('T')[0], // Date YYYY-MM-DD
];
```

### Product-Specific Tags

```typescript
// In data/products.ts
export const products = {
  'product-id': {
    // ... other fields
    ghlTag: 'purchase-product-name-stripe', // Triggers automation
  },
}
```

### Tag-Based Automations

In GHL, create workflows triggered by tags:
1. `purchase-product-name-stripe` → Send product delivery email
2. `stripe-purchase` → Add to customer segment
3. `amount-100+` → Tag as high-value customer

## Custom Fields

### Setting Up Custom Fields

1. In GHL, go to Settings → Custom Fields
2. Create fields for:
   - `stripe_customer_id`
   - `last_purchase_amount`
   - `last_purchase_date`
   - `products_purchased`
   - `lifetime_value`

### Using Custom Fields

```typescript
const customFields = [
  { 
    id: 'stripe_customer_id_field_id', 
    value: session.customer as string 
  },
  { 
    id: 'last_purchase_amount_field_id', 
    value: amountInDollars 
  },
  { 
    id: 'last_purchase_date_field_id', 
    value: new Date().toISOString() 
  },
  { 
    id: 'products_purchased_field_id', 
    value: productNames.join(', ') 
  },
];
```

## Error Handling

### Retry Logic

```typescript
async function syncWithRetry(sessionId: string, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await syncToGHL(sessionId);
      return { success: true };
    } catch (error) {
      console.error(`Sync attempt ${attempt} failed:`, error);
      
      if (attempt === maxRetries) {
        // Log to error tracking service
        await logError('GHL sync failed', { sessionId, error });
        return { success: false, error };
      }
      
      // Exponential backoff
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }
}
```

### Common Error Scenarios

```typescript
// Handle various GHL API errors
catch (error) {
  if (error.status === 401) {
    console.error('GHL authentication failed');
    // Notify admin
  } else if (error.status === 429) {
    console.error('GHL rate limit exceeded');
    // Queue for later
  } else if (error.status === 409) {
    console.error('Duplicate contact');
    // Try update instead
  }
}
```

## Testing

### Test Contact Creation

```bash
curl -X POST http://localhost:3000/api/sync-to-ghl \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "cs_test_xxx"
  }'
```

### Verify in GHL

1. Check Contacts section for new/updated contact
2. Verify tags are applied
3. Check custom fields are populated
4. Confirm automations triggered

## Monitoring

### Key Metrics

- Sync success rate
- Average sync time
- Failed sync count
- Tag application rate
- Automation trigger rate

### Logging

```typescript
console.log('GHL Sync:', {
  action: contact ? 'update' : 'create',
  contactId: contact?.id,
  email: customerEmail,
  tags: contactData.tags,
  timestamp: new Date().toISOString(),
});
```

## Best Practices

1. **Always check for existing contacts** - Prevent duplicates
2. **Use meaningful tags** - Enable precise automation
3. **Handle errors gracefully** - Don't break checkout flow
4. **Log all operations** - For debugging and auditing
5. **Implement retry logic** - Handle temporary failures
6. **Validate data before sending** - Prevent API errors
7. **Use environment variables** - Keep credentials secure

## Troubleshooting

### Contact Not Created
- Verify GHL API credentials
- Check location ID is correct
- Ensure email is valid
- Review API response for errors

### Tags Not Applied
- Verify tags exist in GHL
- Check tag format (no special characters)
- Ensure tags array is not empty

### Automation Not Triggered
- Verify workflow is active
- Check trigger conditions
- Test with manual tag application
- Review workflow logs

## Advanced Features

### Batch Sync

```typescript
async function batchSyncContacts(sessionIds: string[]) {
  const results = await Promise.allSettled(
    sessionIds.map(id => syncToGHL(id))
  );
  
  const successful = results.filter(r => r.status === 'fulfilled');
  const failed = results.filter(r => r.status === 'rejected');
  
  console.log(`Synced: ${successful.length}, Failed: ${failed.length}`);
  
  return { successful, failed };
}
```

### Webhook Integration

```typescript
// app/api/ghl-webhook/route.ts
export async function POST(request: Request) {
  const event = await request.json();
  
  switch (event.type) {
    case 'contact.created':
      // Handle new contact
      break;
    case 'contact.updated':
      // Handle contact update
      break;
    case 'tag.added':
      // Handle tag addition
      break;
  }
  
  return NextResponse.json({ received: true });
}
```

## See Also
- [Module: Stripe Integration](./stripe-integration.md)
- [Recipe: Add Product](../recipes/add-product.md)
- [API Route Pattern](../patterns/api-route-pattern.md)