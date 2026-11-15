'use client';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Project } from '@/lib/projects/types';
import { Arrow } from './Icon';
import { ProjectCover, projectCoverVariants } from './ProjectCover';

export function ProjectRunway({ projects, unavailable }: { projects: Project[]; unavailable: boolean }) {
  const stage = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const scrollTrigger = useRef<ScrollTrigger | null>(null);
  const navigation = useRef<gsap.core.Tween | null>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const covers = projectCoverVariants(projects);

  useEffect(() => {
    const element = track.current, section = stage.current;
    if (!element || !section || projects.length < 2) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let animation: gsap.core.Tween | null = null;
    function configure() {
      navigation.current?.kill(); animation?.scrollTrigger?.kill(); animation?.kill();
      scrollTrigger.current = null;
      const enabled = !media.matches && document.documentElement.dataset.motion !== 'off';
      section!.dataset.scrollDriven = String(enabled);
      if (enabled) {
        animation = gsap.to(element, {
          scrollLeft: () => element!.scrollWidth - element!.clientWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: section, start: 'top top', end: 'bottom bottom', scrub: .45,
            invalidateOnRefresh: true,
            snap: { snapTo: 1 / (projects.length - 1), inertia: false, directional: false, delay: .18, duration: { min: .12, max: .28 }, ease: 'power2.out' },
          },
        });
        scrollTrigger.current = animation.scrollTrigger ?? null;
      }
      ScrollTrigger.refresh();
    }
    const synchronize = () => {
      const index = Math.round(element.scrollLeft / Math.max(1, element.clientWidth));
      activeRef.current = Math.min(projects.length - 1, index);
      setActive(activeRef.current);
    };
    const interrupt = () => navigation.current?.kill();
    configure();
    element.addEventListener('scroll', synchronize, { passive: true });
    window.addEventListener('wheel', interrupt, { passive: true });
    window.addEventListener('touchstart', interrupt, { passive: true });
    window.addEventListener('motionchange', configure); media.addEventListener('change', configure);
    const resize = new ResizeObserver(() => { scrollTrigger.current?.refresh(); }); resize.observe(element);
    return () => {
      navigation.current?.kill(); animation?.scrollTrigger?.kill(); animation?.kill(); resize.disconnect();
      scrollTrigger.current = null;
      element.removeEventListener('scroll', synchronize); window.removeEventListener('wheel', interrupt); window.removeEventListener('touchstart', interrupt);
      window.removeEventListener('motionchange', configure); media.removeEventListener('change', configure);
    };
  }, [projects.length]);

  function move(direction: number) {
    const element = track.current;
    if (!element) return;
    const index = Math.max(0, Math.min(projects.length - 1, activeRef.current + direction));
    activeRef.current = index;
    navigation.current?.kill();
    const trigger = scrollTrigger.current;
    if (trigger) {
      const position = trigger.start + (trigger.end - trigger.start) * index / (projects.length - 1);
      const scroll = { y: window.scrollY };
      navigation.current = gsap.to(scroll, { y: position, duration: .28, ease: 'power3.out', onUpdate: () => window.scrollTo(0, scroll.y) });
    } else element.scrollTo({ left: index * element.clientWidth, behavior: 'instant' });
  }

  return <div className="runway-stage" ref={stage} style={{ '--runway-height': `${100 + Math.max(0, projects.length - 1) * 85}svh` } as React.CSSProperties}>
    <div className="runway-screen">
      <div className="runway-controls"><span>SCROLL TO EXPLORE THE PROJECTS</span><div>
        <button aria-label="Previous projects" disabled={!projects.length || active === 0} onClick={() => move(-1)}><span className="back-arrow"><Arrow /></span></button>
        <button aria-label="Next projects" disabled={!projects.length || active === projects.length - 1} onClick={() => move(1)}><Arrow /></button>
      </div></div>
      <div className="runway-window"><div ref={track} className="horizontal-runway" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Project runway" onKeyDown={event => {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
      }}>
        {projects.length ? projects.map((project, index) => <a className="runway-card" data-active={index === active} aria-current={index === active ? 'true' : undefined} tabIndex={index === active ? 0 : -1} href={`/projects/${project.slug}`} key={project.github_repo_id}>
          <ProjectCover project={project} variant={covers[index]} />
          <div className="runway-card-copy"><span>{project.tech_tags.join(' / ') || project.language || 'SOFTWARE'}</span><h3>{project.display_title || project.name}</h3><p>{project.tagline || project.description || 'Explore the source, decisions and implementation.'}</p><span className="project-open">Explore project <Arrow diagonal /></span></div>
        </a>) : <div className="runway-empty"><h3>{unavailable ? 'A brief holding pattern.' : 'Next departure: being curated.'}</h3><p>{unavailable ? 'The project feed is temporarily unavailable.' : 'Projects appear here once selected for publication.'}</p><a href="https://github.com/ShyaamPrakash" target="_blank" rel="noreferrer">Explore my GitHub <Arrow diagonal /></a></div>}
      </div></div>
      {projects.length > 1 && <div className="runway-position" aria-hidden="true"><span style={{ width: `${(active + 1) / projects.length * 100}%` }} /></div>}
    </div>
  </div>;
}
