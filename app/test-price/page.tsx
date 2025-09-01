'use client';

import { useState } from 'react';

export default function TestPriceCheckout() {
  const [priceId, setPriceId] = useState('');
  const [ghlTag, setGhlTag] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout-by-price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId,
          quantity,
          metadata: ghlTag ? { ghlTag } : undefined,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url as string;
      } else {
        setError(data.error || 'Failed to start checkout');
      }
    } catch (err) {
      setError('Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 32, maxWidth: 600, margin: '0 auto' }}>
      <h1>Checkout by Price ID</h1>
      <p>Use an existing Stripe Price (incl. GHL products).</p>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginTop: 16 }}>
        <label>
          Price ID
          <input
            type="text"
            value={priceId}
            onChange={e => setPriceId(e.target.value)}
            placeholder="price_..."
            required
            style={{ width: '100%', padding: 8 }}
          />
        </label>
        <label>
          Quantity
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={e => setQuantity(parseInt(e.target.value || '1', 10))}
            style={{ width: '100%', padding: 8 }}
          />
        </label>
        <label>
          Optional GHL Tag
          <input
            type="text"
            value={ghlTag}
            onChange={e => setGhlTag(e.target.value)}
            placeholder="purchase-my-product-stripe"
            style={{ width: '100%', padding: 8 }}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '10px 20px',
            fontSize: 16,
            background: '#635BFF',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer'
          }}
        >
          {loading ? 'Creating Session...' : 'Start Checkout'}
        </button>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
      </form>
    </div>
  );
}

