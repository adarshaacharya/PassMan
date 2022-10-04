import { getEnv } from '@/libs/server/env';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const publicPages = ['/', '/api/auth/signin'];

//@note: order of if check is important, please don't modify it
export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: getEnv('NEXTAUTH_SECRET'),
  });

  const { pathname, origin } = req.nextUrl;

  // if session is not found, and the request is not for a public page, redirect to homepage for signin
  if (session && publicPages.includes(pathname)) {
    return NextResponse.redirect(`${origin}/vaults/`);
  }

  // allow authentication and session management
  if (pathname.includes('/api/auth') || session) {
    return NextResponse.next();
  }

  // if session is not found, and the path is not public, redirect to homepage for signin
  if (!session && !publicPages.includes(pathname)) {
    return NextResponse.redirect(`${origin}/`);
  }
}
