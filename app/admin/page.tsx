import Link from 'next/link';
import { redirect } from 'next/navigation';
import { requireAdmin, isConfigured } from '@/lib/supabase/server';
import { signOut } from './actions';
import { ProjectManager } from '@/components/admin/ProjectManager';
import type { Project } from '@/lib/projects/types';

export const dynamic = 'force-dynamic';
export default async function Admin() {
  if (!isConfigured()) redirect('/admin/login');
  const db = await requireAdmin().catch(() => null);
  if (!db) redirect('/admin/login?error=access');
  const [{ data, error }, { data: sync }] = await Promise.all([
    db.from('owner_projects').select('*').order('name'),
    db.from('portfolio_site_settings').select('value').eq('key', 'last_sync').maybeSingle(),
  ]);
  return <main id="main" className="admin-shell"><div className="admin-header"><Link href="/">View portfolio</Link><form action={signOut}><button>Sign out</button></form></div><h1>Project console.</h1><p>Choose what goes public. GitHub sync refreshes repository facts and preserves your editorial choices.</p><p className="notice">Last successful sync: {typeof sync?.value === 'string' ? sync.value : 'Not yet synchronized'}</p>{error ? <p role="alert">Projects could not be loaded. Check the database migration and refresh this page.</p> : <ProjectManager projects={(data ?? []) as Project[]} />}</main>;
}
