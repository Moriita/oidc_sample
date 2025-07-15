import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'OIDC Provider endpoint is working.' });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: 'OIDC Provider POST endpoint is working.' });
} 