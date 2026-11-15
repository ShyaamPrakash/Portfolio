import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPublishedProjects } from '@/lib/projects/queries';
import { safeUrl } from '@/lib/projects/types';
import { Contour } from '@/components/site/Contour';
import { Arrow } from '@/components/site/Icon';

export const dynamic = 'force-dynamic';
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects } = await getPublishedProjects();
  const project = projects.find(p => p.slug === slug);
  return { title: project ? project.display_title || project.name : 'Project not found' };
}
export default async function CaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { projects } = await getPublishedProjects();
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();
  return <main id="main" className="case-study"><Link className="text-link" href="/#work">Back to selected work</Link><h1>{project.display_title || project.name}</h1><p className="large-copy">{project.tagline || project.description}</p><div className={`project-art ${project.art_direction}`} aria-hidden="true"><Contour /><span>{project.language}</span></div>{project.case_study_markdown && <div className="case-body">{project.case_study_markdown}</div>}<div className="case-links"><a className="text-link" href={safeUrl(project.html_url)} target="_blank" rel="noreferrer">Read the source <Arrow diagonal /></a>{safeUrl(project.demo_url) && <a className="text-link" href={safeUrl(project.demo_url)} target="_blank" rel="noreferrer">Open live demo <Arrow diagonal /></a>}</div></main>;
}
