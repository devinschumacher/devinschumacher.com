'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function TestSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('Processing...');

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
            setStatus('✅ Payment successful! Data sent to GoHighLevel.');
          } else {
            setStatus('⚠️ Payment successful but GHL sync failed. Check console.');
          }
        })
        .catch(err => {
          console.error('Error:', err);
          setStatus('⚠️ Error syncing to GHL');
        });
    }
  }, [sessionId]);

  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>Test Purchase Complete</h1>
      <p>{status}</p>
      <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        Session ID: {sessionId}
      </p>
    </div>
  );
}