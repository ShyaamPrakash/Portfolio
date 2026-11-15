import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function isConfigured() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
}

export async function database() {
  if (!isConfigured()) throw new Error('Supabase is not configured.');
  const jar = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!, {
    cookies: {
      getAll: () => jar.getAll(),
      setAll(values) {
        try { values.forEach(({ name, value, options }) => jar.set(name, value, options)); }
        catch { /* Server components cannot write cookies; route handlers perform session refresh. */ }
      },
    },
  });
}

export async function requireAdmin() {
  const db = await database();
  const { data: { user }, error } = await db.auth.getUser();
  if (error || !user) throw new Error('Sign in to continue.');
  const { data, error: accessError } = await db.from('portfolio_admin_allowlist').select('user_id').eq('user_id', user.id).maybeSingle();
  if (accessError || !data) throw new Error('This account does not have owner access.');
  return db;
}
