export type Project = {
  github_repo_id: number;
  name: string;
  description: string;
  html_url: string;
  language: string | null;
  pushed_at: string;
  is_fork: boolean;
  is_archived: boolean;
  is_public: boolean;
  is_visible: boolean;
  is_featured: boolean;
  sort_order: number;
  slug: string;
  display_title: string;
  tagline: string;
  tech_tags: string[];
  art_direction: 'topology' | 'signal-red' | 'ascii-terminal';
  demo_url: string;
  case_study_markdown: string;
};

export function safeUrl(value: unknown): string {
  if (typeof value !== 'string' || !value.trim()) return '';
  try {
    const url = new URL(value.trim());
    return ['http:', 'https:'].includes(url.protocol) && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}

export function publishedProjects(projects: Project[]): Project[] {
  return projects.filter(p => p.is_public && p.is_visible === true).sort((a, b) =>
    Number(b.is_featured) - Number(a.is_featured) || a.sort_order - b.sort_order ||
    b.pushed_at.localeCompare(a.pushed_at) || a.github_repo_id - b.github_repo_id);
}
