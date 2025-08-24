'use client';

import { products } from '@/data/products';

export default function TestStripe() {
  const product = products['skool-video-downloader'];
  
  const handleCheckout = async () => {
    try {
      const response = await fetch('/api/test-checkout', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Stripe → GHL Test</h1>
      <h2>{product.name}</h2>
      <p>{product.description} - TEST MODE: $0.50</p>
      <button 
        onClick={handleCheckout}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#635BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Test Purchase ($0.50)
      </button>
    </div>
  );
}