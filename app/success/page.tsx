'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Success() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('Processing...');
  const [detail, setDetail] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetch('/api/sync-to-ghl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setStatus('✅ Payment successful! Check your email for your license key.');
            setDetail(null);
          } else {
            setStatus('⚠️ Payment successful but there was an issue. Please contact support.');
            try {
              setDetail(JSON.stringify(data, null, 2));
            } catch {
              setDetail(String(data));
            }
          }
        })
        .catch(err => {
          console.error('Error:', err);
          setStatus('⚠️ Error processing order. Please contact support.');
          setDetail(String(err));
        });
    }
  }, [sessionId]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Thank You For Your Purchase!</h1>
      <p>{status}</p>
      {detail && (
        <pre style={{ textAlign: 'left', maxWidth: 800, margin: '16px auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: '#f6f8fa', padding: 12, borderRadius: 6 }}>
          {detail}
        </pre>
      )}
    </div>
  );
}
