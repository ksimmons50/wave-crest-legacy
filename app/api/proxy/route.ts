import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://app.socratic.systems';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { path, ...data } = body;

    if (!path) {
      return NextResponse.json(
        { success: false, error: 'Missing path parameter' },
        { status: 400 }
      );
    }

    // Forward the request to the backend
    const response = await fetch(`${BACKEND_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Proxy request failed' 
      },
      { status: 500 }
    );
  }
}
