# API Route Pattern

Standard pattern for creating Next.js API routes with proper error handling and TypeScript types.

## Pattern Overview

All API routes follow a consistent structure for request handling, validation, and response formatting.

## Related Files
- `app/api/checkout/route.ts`
- `app/api/sync-to-ghl/route.ts`
- `app/api/test-checkout/route.ts`

## Implementation

### Basic Structure

```typescript
import { NextResponse, NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // 1. Parse request body
    const body = await request.json();
    
    // 2. Validate input
    if (!body.requiredField) {
      return NextResponse.json(
        { error: 'Missing required field' },
        { status: 400 }
      );
    }
    
    // 3. Process business logic
    const result = await processData(body);
    
    // 4. Return success response
    return NextResponse.json({ 
      success: true,
      data: result 
    });
    
  } catch (error) {
    // 5. Handle errors
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### With External Service Integration

```typescript
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: Request) {
  try {
    const { productId, customerId } = await request.json();
    
    // Validate against internal data
    const product = products[productId as keyof typeof products];
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Call external service
    const session = await stripe.checkout.sessions.create({
      // configuration
    });
    
    // Return formatted response
    return NextResponse.json({ 
      url: session.url,
      sessionId: session.id 
    });
    
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create session' },
      { status: 500 }
    );
  }
}
```

### With Multiple HTTP Methods

```typescript
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  // GET logic
  return NextResponse.json({ data: result });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // POST logic
  return NextResponse.json({ created: true });
}

export async function PUT(request: NextRequest) {
  const body = await request.json();
  // PUT logic
  return NextResponse.json({ updated: true });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  // DELETE logic
  return NextResponse.json({ deleted: true });
}
```

## Error Response Format

Standard error response structure:

```typescript
{
  error: string;        // User-friendly error message
  details?: any;        // Optional detailed error info
  code?: string;        // Optional error code
}
```

## Success Response Format

Standard success response structure:

```typescript
{
  success: true;
  data?: any;          // Response data
  message?: string;    // Optional success message
  metadata?: {         // Optional metadata
    count?: number;
    page?: number;
    total?: number;
  };
}
```

## Best Practices

1. **Always validate input** before processing
2. **Use appropriate HTTP status codes**
3. **Log errors for debugging** but don't expose internals
4. **Return consistent response formats**
5. **Handle async operations with try/catch**
6. **Use TypeScript for type safety**
7. **Validate environment variables** at startup

## Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Testing Pattern

```typescript
// __tests__/api/checkout.test.ts
describe('/api/checkout', () => {
  it('should create checkout session', async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ productId: 'test' }),
    });
    
    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.url).toBeDefined();
  });
  
  it('should return 404 for invalid product', async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      body: JSON.stringify({ productId: 'invalid' }),
    });
    
    expect(response.status).toBe(404);
  });
});
```

## See Also
- [Recipe: Add API Endpoint](../recipes/add-api-endpoint.md)
- [Code Standards](../code-standards.md)
- [Module: Stripe Integration](../modules/stripe-integration.md)