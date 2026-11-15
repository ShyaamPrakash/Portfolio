import 'server-only';
import { database, isConfigured } from '@/lib/supabase/server';
import type { Project } from './types';
import { publishedProjects } from './types';
import { fetchRepositories } from '@/lib/github/client';
import { unstable_cache } from 'next/cache';

const publicRepositoryFeed = unstable_cache(fetchRepositories, ['public-github-runway'], { revalidate: 900 });

export async function getPublishedProjects(): Promise<{ projects: Project[]; unavailable: boolean }> {
  if (!isConfigured()) {
    try {
      const repos = await publicRepositoryFeed();
      return { projects: repos.filter(r => !r.is_fork && !r.is_archived).map(r => ({ ...r, is_public: true, is_visible: true, is_featured: false, sort_order: 100, slug: `project-${r.github_repo_id}`, display_title: '', tagline: '', tech_tags: [], art_direction: 'topology' as const, demo_url: '', case_study_markdown: '' })), unavailable: false };
    } catch { return { projects: [], unavailable: true }; }
  }
  try {
    const db = await database();
    const { data, error } = await db.from('published_projects').select('*');
    if (error) throw error;
    return { projects: publishedProjects(data as Project[]), unavailable: false };
  } catch {
    return { projects: [], unavailable: true };
  }
}
