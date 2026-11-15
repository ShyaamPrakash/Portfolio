import Link from 'next/link';
import { isConfigured } from '@/lib/supabase/server';
import { signIn } from '../actions';

export default async function Login({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return <main id="main" className="admin-shell"><Link className="text-link" href="/">Back to portfolio</Link><h1>Owner access.</h1><p>Sign in with the GitHub account linked to the portfolio owner.</p>{error && <p role="alert" className="notice error">Sign-in could not be completed. Check your account access and try again.</p>}{isConfigured() ? <form action={signIn} className="admin-toolbar"><button type="submit">Continue with GitHub</button></form> : <p className="notice">Owner access is not configured yet. Follow the Supabase setup steps in README.md.</p>}</main>;
}
