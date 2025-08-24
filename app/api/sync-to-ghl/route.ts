import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(request: Request) {
  try {
    const { sessionId } = await request.json();
    
    // Get the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'line_items'],
    });

    // Get comprehensive customer and purchase data
    const customerEmail = session.customer_details?.email || '';
    const customerName = session.customer_details?.name || '';
    const amountInDollars = (session.amount_total! / 100).toFixed(2);
    
    // Get line items details
    const lineItems = session.line_items?.data || [];
    const productNames = lineItems.map(item => item.description || 'Product').join(', ');
    const itemCount = lineItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

    // First, check if contact exists by email
    const searchResponse = await fetch(`${process.env.GHL_API_BASE_URL}/contacts/lookup?email=${encodeURIComponent(customerEmail)}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_PAT_LOCATION}`,
        'Version': '2021-07-28',
      },
    });

    let ghlResponse;
    const contactData = {
      locationId: process.env.GHL_LOCATION_ID,
      firstName: customerName.split(' ')[0] || '',
      lastName: customerName.split(' ').slice(1).join(' ') || '',
      email: customerEmail,
      phone: session.customer_details?.phone || '',
      // Address fields
      address1: session.customer_details?.address?.line1 || '',
      city: session.customer_details?.address?.city || '',
      state: session.customer_details?.address?.state || '',
      postalCode: session.customer_details?.address?.postal_code || '',
      country: session.customer_details?.address?.country || '',
      // Comprehensive tags for segmentation
      tags: [
        'stripe-purchase',
        `amount-${amountInDollars}`,
        `currency-${session.currency}`,
        session.mode === 'subscription' ? 'subscription' : 'one-time-purchase',
        session.payment_status === 'paid' ? 'payment-complete' : `payment-${session.payment_status}`,
        session.livemode ? 'live-purchase' : 'test-purchase',
        `items-${itemCount}`,
        new Date().toISOString().split('T')[0], // date tag YYYY-MM-DD
        // Add product-specific tag for GHL automation trigger
        ...(session.metadata?.product === 'skool-video-downloader' ? ['purchase-skool-video-downloader-stripe'] : []),
      ],
      source: `Stripe ${session.livemode ? 'Live' : 'Test'}`,
      // Custom fields for detailed tracking
      customFields: [
        // Note: You'll need to create these custom fields in GHL and get their IDs
        // Then uncomment and add the actual field IDs:
        // { id: 'stripe_customer_id', value: session.customer as string },
        // { id: 'stripe_session_id', value: sessionId },
        // { id: 'last_purchase_amount', value: amountInDollars },
        // { id: 'last_purchase_date', value: new Date().toISOString() },
        // { id: 'products_purchased', value: productNames },
        // { id: 'payment_method', value: session.payment_method_types?.join(', ') || 'card' },
        // { id: 'invoice_url', value: session.invoice || '' },
      ],
    };

    // Remove locationId for updates
    const { locationId, ...updateData } = contactData;
    
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      if (searchData.contact) {
        // Contact exists, update it
        console.log('Updating existing contact:', searchData.contact.id);
        ghlResponse = await fetch(`${process.env.GHL_API_BASE_URL}/contacts/${searchData.contact.id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${process.env.GHL_PAT_LOCATION}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28',
          },
          body: JSON.stringify(updateData), // Use updateData without locationId
        });
      } else {
        // Contact doesn't exist, create it
        console.log('Creating new contact');
        ghlResponse = await fetch(`${process.env.GHL_API_BASE_URL}/contacts/`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.GHL_PAT_LOCATION}`,
            'Content-Type': 'application/json',
            'Version': '2021-07-28',
          },
          body: JSON.stringify(contactData), // Use full contactData with locationId for create
        });
      }
    } else {
      // If search fails, just try to create
      console.log('Search failed, attempting to create new contact');
      ghlResponse = await fetch(`${process.env.GHL_API_BASE_URL}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GHL_PAT_LOCATION}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
        body: JSON.stringify(contactData),
      });
      
      // If creation fails due to duplicate, try to update using the ID from error
      if (!ghlResponse.ok) {
        const errorData = await ghlResponse.json();
        if (errorData.meta?.contactId) {
          console.log('Duplicate found, updating contact:', errorData.meta.contactId);
          ghlResponse = await fetch(`${process.env.GHL_API_BASE_URL}/contacts/${errorData.meta.contactId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${process.env.GHL_PAT_LOCATION}`,
              'Content-Type': 'application/json',
              'Version': '2021-07-28',
            },
            body: JSON.stringify(updateData), // Use updateData without locationId
          });
        }
      }
    }

    const ghlData = await ghlResponse.json();
    
    console.log('GHL Response:', ghlData);

    if (!ghlResponse.ok) {
      console.error('GHL Error:', ghlData);
      return NextResponse.json({ success: false, error: ghlData });
    }

    return NextResponse.json({ success: true, ghlContact: ghlData });
  } catch (error) {
    console.error('Sync error:', error);
    return NextResponse.json({ success: false, error: String(error) });
  }
}