import 'server-only';
import { z } from 'zod';

const repository = z.object({
  id: z.number().int().positive().max(Number.MAX_SAFE_INTEGER), name: z.string().min(1).max(100),
  description: z.string().nullable(), html_url: z.url().startsWith('https://github.com/ShyaamPrakash/'),
  language: z.string().nullable(), pushed_at: z.string().datetime(),
  fork: z.boolean(), archived: z.boolean(), private: z.boolean(),
});

export async function fetchRepositories() {
  const repos = [];
  for (let page = 1; page <= 100; page++) {
    const response = await fetch(`https://api.github.com/users/ShyaamPrakash/repos?per_page=100&type=owner&page=${page}`, {
      cache: 'no-store', signal: AbortSignal.timeout(15000),
      headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28',
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) },
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}. The previous snapshot was kept.`);
    const batch = z.array(repository).parse(await response.json());
    repos.push(...batch.filter(r => !r.private).map(r => ({
      github_repo_id: r.id, name: r.name, description: r.description ?? '', html_url: r.html_url,
      language: r.language, pushed_at: r.pushed_at, is_fork: r.fork, is_archived: r.archived,
    })));
    if (!response.headers.get('link')?.includes('rel="next"')) return repos;
  }
  throw new Error('Repository pagination exceeded its safety limit. The previous snapshot was kept.');
}
