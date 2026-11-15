'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { database, requireAdmin } from '@/lib/supabase/server';
import { fetchRepositories } from '@/lib/github/client';
import { safeUrl } from '@/lib/projects/types';

export async function signIn() {
  const db = await database();
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!site) throw new Error('Set NEXT_PUBLIC_SITE_URL before signing in.');
  const { data, error } = await db.auth.signInWithOAuth({ provider: 'github', options: { redirectTo: new URL('/auth/callback', site).href } });
  if (error || !data.url) redirect('/admin/login?error=oauth');
  redirect(data.url);
}

export async function signOut() {
  const db = await database();
  const { error } = await db.auth.signOut();
  if (error) throw new Error('Sign-out failed. Please try again.');
  redirect('/admin/login');
}

const settings = z.object({
  github_repo_id: z.coerce.number().int().positive().max(Number.MAX_SAFE_INTEGER),
  display_title: z.string().trim().max(100), tagline: z.string().trim().max(300),
  slug: z.string().trim().min(1).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  sort_order: z.coerce.number().int().min(0).max(10000),
  art_direction: z.enum(['topology', 'signal-red', 'ascii-terminal']),
  demo_url: z.string().trim().max(2048).refine(value => !value || Boolean(safeUrl(value)), 'Use a complete http or https URL.'),
  tech_tags: z.string().max(400), case_study_markdown: z.string().trim().max(15000),
});

export async function saveProject(_previous: string, form: FormData): Promise<string> {
  try {
    const db = await requireAdmin();
    const parsed = settings.safeParse(Object.fromEntries(form));
    if (!parsed.success) return parsed.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join(' ');
    const value = parsed.data;
    const { error } = await db.from('portfolio_project_settings').update({
      ...value, demo_url: safeUrl(value.demo_url), tech_tags: value.tech_tags.split(',').map(t => t.trim()).filter(Boolean),
      is_visible: form.get('is_visible') === 'on', is_featured: form.get('is_featured') === 'on',
      updated_at: new Date().toISOString(),
    }).eq('github_repo_id', value.github_repo_id).select('github_repo_id').single();
    if (error) return error.code === '23505' ? 'That project URL is already in use. Choose a different slug.' : 'Save failed. Your edits are still here; please try again.';
    revalidatePath('/'); revalidatePath('/projects', 'layout'); revalidatePath('/admin');
    return 'Saved. Publication settings are now updated.';
  } catch { return 'Your owner session could not be verified. Sign in again before saving.'; }
}

export async function syncGitHub(): Promise<string> {
  try {
    const db = await requireAdmin();
    const { error: lockError } = await db.rpc('claim_github_sync');
    if (lockError) return 'Sync is unavailable or was recently requested. Wait one minute and try again.';
    const repos = await fetchRepositories();
    const { error } = await db.rpc('replace_github_snapshot', { repositories: repos });
    if (error) return 'The snapshot could not be saved. The previous snapshot is unchanged.';
    revalidatePath('/'); revalidatePath('/admin'); revalidatePath('/projects', 'layout');
    return `Synced ${repos.length} public repositories. New repositories remain hidden.`;
  } catch (error) {
    return error instanceof Error && error.message.startsWith('GitHub returned') ? error.message : 'Sync failed. The previous snapshot was kept. Check your connection and owner session.';
  }
}
