import { NextRequest } from 'next/server';

const TINA_PUBLIC_SERVER = 'https://content.tinajs.io';
const isStaticExport =
  process.env.GITHUB_ACTIONS === 'true' || process.env.NEXT_OUTPUT === 'export';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return [{ routes: ['__placeholder__'] }];
}

type Params = {
  params: Promise<{
    routes: string[];
  }>;
};

export async function GET(
  request: NextRequest,
  context: Params
) {
  if (isStaticExport) {
    // Tina proxy routes are not available in static exports.
    return new Response('Not available in static export', { status: 404 });
  }

  const params = await context.params;
  const path = params.routes ? params.routes.join('/') : '';
  const url = `${TINA_PUBLIC_SERVER}/${path}${request.nextUrl.search}`;
  
  const response = await fetch(url, {
    headers: {
      'X-API-KEY': process.env.TINA_TOKEN || '',
    },
  });
  
  const data = await response.text();
  
  return new Response(data, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'application/json',
    },
  });
}

export async function POST(
  request: NextRequest,
  context: Params
) {
  if (isStaticExport) {
    // Tina proxy routes are not available in static exports.
    return new Response('Not available in static export', { status: 404 });
  }

  const params = await context.params;
  const path = params.routes ? params.routes.join('/') : '';
  const url = `${TINA_PUBLIC_SERVER}/${path}${request.nextUrl.search}`;
  
  const body = await request.text();
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-API-KEY': process.env.TINA_TOKEN || '',
      'Content-Type': 'application/json',
    },
    body,
  });
  
  const data = await response.text();
  
  return new Response(data, {
    status: response.status,
    headers: {
      'Content-Type': response.headers.get('Content-Type') || 'application/json',
    },
  });
}
