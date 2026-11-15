import type { MetadataRoute } from 'next';
import { getPublishedProjects } from '@/lib/projects/queries';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  if (!site || new URL(site).hostname === 'localhost') return [];
  const { projects } = await getPublishedProjects();
  return [{ url: site }, ...projects.map(p => ({ url: new URL(`/projects/${p.slug}`, site).href }))];
}
