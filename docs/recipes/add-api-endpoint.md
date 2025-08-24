# Recipe: Add New API Endpoint

Step-by-step guide to create a new API endpoint in the Next.js app.

## Prerequisites
- Understanding of Next.js API routes
- TypeScript knowledge

## Steps

### 1. Create Route File

Create a new route file in the `app/api/` directory:

```bash
# Create directory and route file
mkdir -p app/api/your-endpoint
touch app/api/your-endpoint/route.ts
```

### 2. Implement Basic Handler

Add the basic route handler structure:

```typescript
// app/api/your-endpoint/route.ts
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Your logic here
    return NextResponse.json({ 
      success: true,
      message: "GET request successful" 
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.requiredField) {
      return NextResponse.json(
        { error: 'Missing required field' },
        { status: 400 }
      );
    }
    
    // Process request
    const result = await processData(body);
    
    return NextResponse.json({ 
      success: true,
      data: result 
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 3. Add Type Definitions

Define types for request and response:

```typescript
// app/api/your-endpoint/route.ts
interface RequestBody {
  requiredField: string;
  optionalField?: number;
}

interface ResponseData {
  success: boolean;
  data?: {
    id: string;
    result: string;
  };
  error?: string;
}
```

### 4. Implement Business Logic

Add your specific business logic:

```typescript
async function processData(body: RequestBody): Promise<any> {
  // Example: Database operation
  const result = await db.create({
    field: body.requiredField,
    timestamp: new Date().toISOString(),
  });
  
  return result;
}
```

### 5. Add Environment Variables (if needed)

```typescript
// Check for required env vars
if (!process.env.API_KEY) {
  throw new Error('API_KEY environment variable is required');
}

// Use in your handler
const apiKey = process.env.API_KEY;
```

### 6. Test the Endpoint

Create a test file or use curl:

```bash
# GET request
curl http://localhost:3000/api/your-endpoint

# POST request
curl -X POST http://localhost:3000/api/your-endpoint \
  -H "Content-Type: application/json" \
  -d '{"requiredField": "test value"}'
```

## Example: Complete API Endpoint

Here's a complete example of a user registration endpoint:

```typescript
// app/api/register/route.ts
import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';

interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

interface RegisterResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<RegisterResponse>> {
  try {
    // Parse request body
    const body: RegisterRequest = await request.json();
    
    // Validate input
    if (!body.email || !body.password || !body.name) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Email, password, and name are required' 
        },
        { status: 400 }
      );
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid email format' 
        },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const existingUser = await db.user.findUnique({
      where: { email: body.email }
    });
    
    if (existingUser) {
      return NextResponse.json(
        { 
          success: false,
          error: 'User already exists' 
        },
        { status: 409 }
      );
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    
    // Create user
    const user = await db.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
      select: {
        id: true,
        email: true,
        name: true,
      }
    });
    
    // Return success response
    return NextResponse.json({
      success: true,
      user,
    }, { status: 201 });
    
  } catch (error) {
    console.error('Registration error:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to register user' 
      },
      { status: 500 }
    );
  }
}
```

## Advanced Patterns

### With Rate Limiting

```typescript
import { rateLimit } from '@/lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 1 minute
  uniqueTokenPerInterval: 500,
});

export async function POST(request: NextRequest) {
  try {
    await limiter.check(request, 10, 'CACHE_TOKEN');
    // Continue with request processing
  } catch {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    );
  }
}
```

### With Authentication

```typescript
import { verifyToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
  
  // Continue with authenticated request
}
```

### With File Upload

```typescript
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return NextResponse.json(
      { error: 'No file provided' },
      { status: 400 }
    );
  }
  
  const buffer = Buffer.from(await file.arrayBuffer());
  // Process file...
}
```

## Testing

### Unit Test Example

```typescript
// __tests__/api/your-endpoint.test.ts
import { POST } from '@/app/api/your-endpoint/route';
import { NextRequest } from 'next/server';

describe('/api/your-endpoint', () => {
  it('should handle valid request', async () => {
    const request = new NextRequest('http://localhost:3000/api/your-endpoint', {
      method: 'POST',
      body: JSON.stringify({ requiredField: 'test' }),
    });
    
    const response = await POST(request);
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
  });
  
  it('should reject invalid request', async () => {
    const request = new NextRequest('http://localhost:3000/api/your-endpoint', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    
    const response = await POST(request);
    
    expect(response.status).toBe(400);
  });
});
```

## Common Issues and Solutions

### Issue: CORS Errors
**Solution:** Add CORS headers:
```typescript
return NextResponse.json(data, {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  },
});
```

### Issue: Request Body is Empty
**Solution:** Ensure Content-Type header is set:
```typescript
// Client side
fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
});
```

## Related Files
- `app/api/` - API routes directory
- `app/api/checkout/route.ts` - Example payment endpoint
- `app/api/sync-to-ghl/route.ts` - Example integration endpoint

## See Also
- [API Route Pattern](../patterns/api-route-pattern.md)
- [Code Standards](../code-standards.md)
- [Quick Reference](../quick-reference.md)