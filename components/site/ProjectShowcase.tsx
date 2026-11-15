'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import type { Project } from '@/lib/projects/types';
import { Arrow } from './Icon';
import { Contour } from './Contour';

export function ProjectShowcase({ projects, unavailable }: { projects: Project[]; unavailable: boolean }) {
  const [index, setIndex] = useState(0);
  const slide = useRef<HTMLDivElement>(null);
  const start = useRef<number | null>(null);
  function move(direction: number) {
    setIndex(current => (current + direction + projects.length) % projects.length);
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && document.documentElement.dataset.motion !== 'off') {
      gsap.fromTo(slide.current, { x: direction * 22, rotateY: direction * 2, scaleX: .985 }, { x: 0, rotateY: 0, scaleX: 1, duration: .28, ease: 'power3.out', overwrite: true });
    }
  }
  const project = projects[index];
  return <section id="work" className="work section-pad">
    <div className="section-heading"><h2 className="work-heading">Selected<br /><em>work.</em></h2><p>Ideas, turned into systems.<br />A closer look at what I’m building.</p></div>
    {!project ? <div className="work-empty"><Contour /><div><h3>{unavailable ? 'The gallery is taking a moment.' : 'Good work takes a little curation.'}</h3><p>{unavailable ? 'Please try again shortly. You can still explore my public repositories on GitHub.' : 'Selected projects will appear here once curated. In the meantime, explore my repositories on GitHub.'}</p><a className="text-link" href="https://github.com/ShyaamPrakash" target="_blank" rel="noreferrer">Explore GitHub <Arrow diagonal /></a></div></div> : <>
      <div className="project-slide" ref={slide} tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Selected projects" onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
      }} onTouchStart={event => { start.current = event.touches[0].clientX; }} onTouchEnd={event => {
        if (start.current !== null) { const difference = event.changedTouches[0].clientX - start.current; if (Math.abs(difference) > 60) move(difference > 0 ? -1 : 1); start.current = null; }
      }}>
        <div className={`project-art ${project.art_direction}`} aria-hidden="true"><Contour /><span>{project.language || 'SYSTEMS'}</span><b>{String(index + 1).padStart(2, '0')}</b></div>
        <div className="project-copy" aria-live="polite" aria-atomic="true"><span className="mono">{project.tech_tags.length ? project.tech_tags.join(' / ') : project.language}</span><h3>{project.display_title || project.name}</h3><p>{project.tagline || project.description || 'Explore the source and implementation on GitHub.'}</p><Link className="text-link" href={`/projects/${project.slug}`}>Explore project <Arrow /></Link></div>
      </div>
      <div className="gallery-controls"><span className="mono">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><div className="gallery-rail" aria-hidden="true"><span style={{ width: `${(index + 1) / projects.length * 100}%` }} /></div><button aria-label="Previous project" onClick={() => move(-1)} disabled={projects.length < 2}><span className="reverse"><Arrow /></span></button><button aria-label="Next project" onClick={() => move(1)} disabled={projects.length < 2}><Arrow /></button></div>
    </>}
  </section>;
}
