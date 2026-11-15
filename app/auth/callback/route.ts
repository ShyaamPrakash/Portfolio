import { NextRequest, NextResponse } from 'next/server';
import { database } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const site = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin;
  const code = request.nextUrl.searchParams.get('code');
  if (code) {
    try {
      const db = await database();
      const { error } = await db.auth.exchangeCodeForSession(code);
      if (!error) return NextResponse.redirect(new URL('/admin', site));
    } catch { /* Return a recoverable sign-in error without exposing provider details. */ }
  }
  return NextResponse.redirect(new URL('/admin/login?error=callback', site));
}
