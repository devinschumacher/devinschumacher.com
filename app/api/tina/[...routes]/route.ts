import { NextRequest } from 'next/server';

const TINA_PUBLIC_SERVER = 'https://content.tinajs.io';

type Params = {
  params: Promise<{
    routes: string[];
  }>;
};

export async function GET(
  request: NextRequest,
  context: Params
) {
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