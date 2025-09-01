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
    // Build optional custom fields mapping based on provided env IDs in .env
    const customFields: Array<{ id: string; value: string }> = [];
    const pushCF = (envKey: string, value?: string | number | null) => {
      const id = process.env[envKey];
      if (id && value !== undefined && value !== null && String(value).length > 0) {
        customFields.push({ id, value: String(value) });
      }
    };

    // Map commonly wanted purchase fields into GHL custom fields if IDs provided
    pushCF('GHL_CF_STRIPE_CUSTOMER_ID', (session.customer as string) || '');
    pushCF('GHL_CF_STRIPE_SESSION_ID', sessionId);
    pushCF('GHL_CF_LAST_PURCHASE_AMOUNT', amountInDollars);
    pushCF('GHL_CF_LAST_PURCHASE_DATE', new Date().toISOString());
    pushCF('GHL_CF_PRODUCTS_PURCHASED', productNames);
    pushCF('GHL_CF_PAYMENT_METHOD_TYPES', (session.payment_method_types || []).join(', '));
    pushCF('GHL_CF_CURRENCY', session.currency || '');
    pushCF('GHL_CF_ITEM_COUNT', itemCount);

    const contactData: any = {
      locationId: process.env.GHL_LOCATION_ID,
      firstName: customerName.split(' ')[0] || '',
      lastName: customerName.split(' ').slice(1).join(' ') || '',
      email: customerEmail,
      phone: session.customer_details?.phone || '',
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
        ...(session.metadata?.ghlTag ? [String(session.metadata.ghlTag)] : []),
        // Backward compat for hardcoded product mapping
        ...(session.metadata?.product === 'skool-video-downloader' ? ['purchase-skool-video-downloader-stripe'] : []),
      ],
      source: `Stripe ${session.livemode ? 'Live' : 'Test'}`,
      // Custom fields for detailed tracking (only included if env IDs are provided)
      customFields,
    };

    // Conditionally include address fields only when present; normalize country to uppercase ISO
    const addr = session.customer_details?.address;
    if (addr?.line1) contactData.address1 = addr.line1;
    if (addr?.city) contactData.city = addr.city;
    if (addr?.state) contactData.state = addr.state;
    if (addr?.postal_code) contactData.postalCode = addr.postal_code;
    if (addr?.country) contactData.country = String(addr.country).toUpperCase();

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
      const createResponse = await fetch(`${process.env.GHL_API_BASE_URL}/contacts/`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.GHL_PAT_LOCATION}`,
          'Content-Type': 'application/json',
          'Version': '2021-07-28',
        },
        body: JSON.stringify(contactData),
      });

      if (!createResponse.ok) {
        // Try to parse JSON body once
        let errorBodyText = '';
        try { errorBodyText = await createResponse.text(); } catch {}
        let errorData: any = errorBodyText;
        try { errorData = JSON.parse(errorBodyText); } catch {}

        if (errorData?.meta?.contactId) {
          console.log('Duplicate found, updating contact:', errorData.meta.contactId);
          const updateResp = await fetch(`${process.env.GHL_API_BASE_URL}/contacts/${errorData.meta.contactId}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${process.env.GHL_PAT_LOCATION}`,
              'Content-Type': 'application/json',
              'Version': '2021-07-28',
            },
            body: JSON.stringify(updateData), // Use updateData without locationId
          });
          ghlResponse = updateResp;
        } else {
          console.error('GHL Create Error:', errorData);
          return NextResponse.json({ success: false, error: errorData }, { status: createResponse.status || 400 });
        }
      } else {
        ghlResponse = createResponse;
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
