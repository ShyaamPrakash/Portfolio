import { test } from 'node:test';
import assert from 'node:assert/strict';
import { publishedProjects, safeUrl, type Project } from '../../lib/projects/types.ts';

const project = (id: number, changes: Partial<Project> = {}): Project => ({
  github_repo_id: id, name: 'Example', description: '', html_url: 'https://github.com/ShyaamPrakash/example',
  language: 'Python', pushed_at: '2026-01-01T00:00:00Z', is_public: true, is_visible: true,
  is_fork: false, is_archived: false, is_featured: false, sort_order: 100,
  slug: `project-${id}`, display_title: '', tagline: '', tech_tags: [], art_direction: 'topology',
  demo_url: '', case_study_markdown: '', ...changes,
});

test('hidden, unavailable and absent publication permission never enter the gallery', () => {
  assert.deepEqual(publishedProjects([project(1), project(2, { is_visible: false }), project(3, { is_public: false }), project(4, { is_visible: undefined })]).map(p => p.github_repo_id), [1]);
});
test('feature, explicit order and stable ID decide ordering without mutating input', () => {
  const source = [project(4), project(3, { sort_order: 1 }), project(2), project(1, { is_featured: true })];
  assert.deepEqual(publishedProjects(source).map(p => p.github_repo_id), [1, 3, 2, 4]);
  assert.equal(source[0].github_repo_id, 4);
});
test('untrusted URLs reject executable protocols, credentials and malformed input', () => {
  for (const value of ['javascript:alert(1)', 'data:text/html,<script>', '//evil.test', 'https://user:pass@example.com', null, 'not a URL']) assert.equal(safeUrl(value), '');
  assert.equal(safeUrl('  https://example.com/demo  '), 'https://example.com/demo');
});
