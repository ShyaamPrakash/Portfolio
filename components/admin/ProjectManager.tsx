'use client';

import { useActionState, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { saveProject, syncGitHub } from '@/app/admin/actions';
import type { Project } from '@/lib/projects/types';

function Editor({ project }: { project: Project }) {
  const [message, action, pending] = useActionState(saveProject, '');
  return <details className="admin-project"><summary><span>{project.display_title || project.name}</span><span className="mono">{project.is_visible ? 'Published' : 'Hidden'}{!project.is_public ? ' / unavailable' : ''}</span></summary><p>{project.description || 'No GitHub description.'} {project.is_fork ? 'Fork. ' : ''}{project.is_archived ? 'Archived. ' : ''}</p><form action={action} className="admin-form">
    <input type="hidden" name="github_repo_id" value={project.github_repo_id} />
    <label className="check"><input name="is_visible" type="checkbox" defaultChecked={project.is_visible} />Publish project</label>
    <label className="check"><input name="is_featured" type="checkbox" defaultChecked={project.is_featured} />Feature first</label>
    <label>Display title<input name="display_title" maxLength={100} defaultValue={project.display_title} /></label>
    <label>Project URL slug<input name="slug" pattern="[a-z0-9]+(-[a-z0-9]+)*" required defaultValue={project.slug} /></label>
    <label className="wide">Summary<textarea name="tagline" maxLength={300} defaultValue={project.tagline} /></label>
    <label>Order (lowest first)<input type="number" name="sort_order" min="0" max="10000" defaultValue={project.sort_order} /></label>
    <label>Artwork<select name="art_direction" defaultValue={project.art_direction}><option value="topology">Monochrome topology</option><option value="signal-red">Signal red</option><option value="ascii-terminal">Terminal</option></select></label>
    <label>Technology tags (comma separated)<input name="tech_tags" maxLength={400} defaultValue={project.tech_tags.join(', ')} /></label>
    <label>Live demo URL<input type="url" name="demo_url" defaultValue={project.demo_url} placeholder="https://" /></label>
    <label className="wide">Case study (plain text)<textarea name="case_study_markdown" rows={10} maxLength={15000} defaultValue={project.case_study_markdown} /></label>
    <div className="wide"><button disabled={pending}>{pending ? 'Saving…' : 'Save changes'}</button><p role="status" className="notice">{message}</p></div>
  </form></details>;
}

export function ProjectManager({ projects }: { projects: Project[] }) {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState('');
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const filtered = projects.filter(p => `${p.name} ${p.language ?? ''} ${p.tech_tags.join(' ')}`.toLowerCase().includes(query.trim().toLowerCase()) && (filter === 'all' || (filter === 'published' ? p.is_visible : !p.is_visible)));
  return <><div className="admin-toolbar"><label htmlFor="search">Find project</label><input id="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Name, language or tag" /><button disabled={pending} onClick={() => startTransition(async () => { setMessage(await syncGitHub()); router.refresh(); })}>{pending ? 'Syncing…' : 'Sync GitHub'}</button></div><label>Show<select value={filter} onChange={e => setFilter(e.target.value)}><option value="all">All projects</option><option value="published">Published</option><option value="hidden">Hidden</option></select></label><p role="status" className="notice">{message}</p>{filtered.map(project => <Editor key={`${project.github_repo_id}-${project.pushed_at}`} project={project} />)}{!filtered.length && <p className="notice">{projects.length ? 'No projects match this search.' : 'No repositories yet. Sync GitHub to begin curating.'}</p>}</>;
}
