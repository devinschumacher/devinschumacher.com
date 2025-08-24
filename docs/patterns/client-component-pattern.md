# Client Component Pattern

Pattern for creating interactive client-side components with state management and user interactions.

## Pattern Overview

Client components are used when you need browser-only features like state, effects, event handlers, or browser APIs.

## Related Files
- `components/BlogPageClient.tsx`
- `components/BlogArticles.tsx`
- `app/test-stripe/page.tsx`

## Implementation

### Basic Client Component

```typescript
"use client";

import { useState, useEffect } from 'react';

interface ComponentProps {
  initialData: string;
  onUpdate?: (value: string) => void;
}

export function ClientComponent({ initialData, onUpdate }: ComponentProps) {
  const [value, setValue] = useState(initialData);
  
  useEffect(() => {
    // Client-side only code
    console.log('Component mounted');
  }, []);
  
  const handleChange = (newValue: string) => {
    setValue(newValue);
    onUpdate?.(newValue);
  };
  
  return (
    <div>
      <input 
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
```

### With Complex State and Filtering

```typescript
"use client";

import { useState, useMemo } from 'react';

interface Item {
  id: string;
  name: string;
  category: string;
}

interface FilteredListProps {
  items: Item[];
}

export function FilteredList({ items }: FilteredListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  // Memoize filtered results
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      const matchesSearch = searchQuery === "" || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || 
        item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [items, searchQuery, selectedCategory]);
  
  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.category));
    return Array.from(cats).sort();
  }, [items]);
  
  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search..."
      />
      
      <select 
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      
      <div>
        {filteredItems.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
```

### With API Calls

```typescript
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CheckoutButton({ productId }: { productId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      });
      
      if (!response.ok) {
        throw new Error('Checkout failed');
      }
      
      const { url } = await response.json();
      
      // Redirect to Stripe
      window.location.href = url;
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      <button 
        onClick={handleCheckout}
        disabled={loading}
        className="btn-primary"
      >
        {loading ? 'Processing...' : 'Checkout'}
      </button>
    </div>
  );
}
```

### With Event Handlers and Refs

```typescript
"use client";

import { useRef, useState } from 'react';

export function FileUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Process file
    }
  };
  
  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        className="hidden"
      />
      <button onClick={handleButtonClick}>
        Choose File
      </button>
      {selectedFile && <p>Selected: {selectedFile.name}</p>}
    </div>
  );
}
```

## State Management Patterns

### Local State
```typescript
const [value, setValue] = useState(initialValue);
```

### Derived State
```typescript
const derivedValue = useMemo(() => {
  return expensiveComputation(value);
}, [value]);
```

### Multiple State Updates
```typescript
const resetFilters = () => {
  setSearchQuery("");
  setSelectedCategory("all");
  setPageNumber(1);
};
```

## Performance Optimization

### Memoization
```typescript
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

### Lazy Loading
```typescript
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { 
    loading: () => <p>Loading...</p>,
    ssr: false 
  }
);
```

## Common Patterns

### Loading States
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<Data | null>(null);
```

### Form Handling
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
});

const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData(prev => ({
    ...prev,
    [e.target.name]: e.target.value
  }));
};
```

### Debouncing
```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    performSearch(searchQuery);
  }, 500);
  
  return () => clearTimeout(timer);
}, [searchQuery]);
```

## Best Practices

1. **Always add "use client" directive** at the top
2. **Initialize state properly** to avoid hydration errors
3. **Use memoization** for expensive computations
4. **Handle loading and error states**
5. **Clean up effects** to prevent memory leaks
6. **Avoid unnecessary re-renders** with proper dependencies
7. **Type all props and state** for better DX

## Testing Client Components

```typescript
import { render, screen, fireEvent } from '@testing-library/react';

describe('ClientComponent', () => {
  it('should handle user interaction', () => {
    render(<ClientComponent initialData="test" />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(input.value).toBe('new value');
  });
});
```

## See Also
- [Component Pattern](./component-pattern.md)
- [Recipe: Add Interactive Feature](../recipes/add-interactive-feature.md)
- [Code Standards](../code-standards.md)