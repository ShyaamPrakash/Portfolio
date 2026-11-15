'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { AsciiStage } from './AsciiStage';
import { Arrow } from './Icon';
import type { Project } from '@/lib/projects/types';

export type View = 'signal' | 'profile' | 'projects' | 'systems' | 'journey' | 'contact';
const tabs: { id: View; label: string; index: string }[] = [
  { id: 'signal', label: 'Overview', index: '00' }, { id: 'profile', label: 'Profile', index: '01' },
  { id: 'projects', label: 'Projects', index: '02' }, { id: 'systems', label: 'Systems', index: '03' },
  { id: 'journey', label: 'Journey', index: '04' }, { id: 'contact', label: 'Contact', index: '05' },
];

function Content({ view, projects, unavailable }: { view: View; projects: Project[]; unavailable: boolean }) {
  if (view === 'profile') return <><h1>Software, studied<br />from the inside.</h1><p className="view-lead">I’m Shyaam, a Software Systems student drawn to algorithms, systems and the moments where ideas become useful tools.</p><p className="view-copy">I like understanding how a problem is structured before deciding how to solve it. My projects span backend applications, graph algorithms and applied machine learning.</p><p className="data-line">PSG COLLEGE OF TECHNOLOGY <span>/</span> INTEGRATED M.SC.</p></>;
  if (view === 'projects') return <><h1>Built to solve<br />a real problem.</h1><p className="view-lead">A changing selection from my public GitHub work.</p>{unavailable && <p role="status" className="view-copy">The project catalogue is temporarily unavailable. Visit GitHub to browse my repositories.</p>}{projects.length ? <ul className="project-list">{projects.slice(0, 6).map((project, i) => <li key={project.github_repo_id}><a href={project.html_url} target="_blank" rel="noreferrer"><span className="project-index">{String(i + 1).padStart(2, '0')}</span><span><strong>{project.display_title || project.name}</strong><small>{project.tagline || project.description || project.language}</small></span><Arrow diagonal /></a></li>)}</ul> : <a className="inline-link" href="https://github.com/ShyaamPrakash" target="_blank" rel="noreferrer">Open GitHub repositories <Arrow diagonal /></a>}</>;
  if (view === 'systems') return <><h1>Tools for<br />thinking clearly.</h1><p className="view-lead">A toolkit formed through coursework and hands-on projects.</p><div className="system-groups"><div><span className="data-line">LANGUAGES</span><p>Python / C / C++ / JavaScript</p></div><div><span className="data-line">BACKEND</span><p>Flask / FastAPI</p></div><div><span className="data-line">DATA</span><p>PostgreSQL / MySQL / Applied machine learning</p></div><div><span className="data-line">TOOLS</span><p>Linux / Windows / Git / GitHub</p></div></div></>;
  if (view === 'journey') return <><h1>Always in<br />the process.</h1><p className="view-lead">Integrated M.Sc. Software Systems · 2025—2030</p><p className="view-copy">PSG College of Technology<br />CGPA 9.47, as recorded in the supplied resume.</p><div className="system-groups"><div><span className="data-line">CURRENT</span><p>Second-year Class Representative</p></div><div><span className="data-line">FOUNDATIONS</span><p>CS50x completed</p></div></div></>;
  if (view === 'contact') return <><h1>Have a good<br />problem?</h1><p className="view-lead">I’m always curious about how other people approach a challenge.</p><a className="contact-action" href="https://github.com/ShyaamPrakash" target="_blank" rel="noreferrer">Find me on GitHub <Arrow diagonal /></a><p className="data-line">PUBLIC LINKS ONLY <span>/</span> NO PRIVATE DETAILS</p></>;
  return <><p className="hero-name">SHYAAM<span> P.</span></p><h1 className="hero-statement">Logic into<br /><em>living systems.</em></h1><p className="view-lead">Software Systems student exploring algorithms, backend engineering and applied machine learning.</p><button className="enter-button" onClick={() => window.dispatchEvent(new CustomEvent('select-portfolio-tab', { detail: 'projects' }))}>Explore the work <Arrow /></button></>;
}

export function PortfolioConsole({ projects, unavailable }: { projects: Project[]; unavailable: boolean }) {
  const [active, setActive] = useState<View>('signal');
  const [reduced, setReduced] = useState(true);
  const [motionOn, setMotionOn] = useState(true);
  const panel = useRef<HTMLElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  function change(view: View, focus = false) {
    if (view === active) return;
    if (motionOn && !reduced && panel.current) {
      gsap.killTweensOf(panel.current);
      gsap.fromTo(panel.current, { clipPath: 'inset(0 0 0 10%)', opacity: .45, scale: .99 }, { clipPath: 'inset(0 0 0 0%)', opacity: 1, scale: 1, duration: .24, ease: 'power3.out', overwrite: true });
    }
    setActive(view);
    if (focus) requestAnimationFrame(() => tabRefs.current[tabs.findIndex(tab => tab.id === view)]?.focus());
  }
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { setReduced(media.matches); setMotionOn(document.documentElement.dataset.motion !== 'off'); };
    update(); media.addEventListener('change', update); window.addEventListener('motionchange', update);
    const select = (event: Event) => change((event as CustomEvent<View>).detail);
    window.addEventListener('select-portfolio-tab', select);
    return () => { media.removeEventListener('change', update); window.removeEventListener('motionchange', update); window.removeEventListener('select-portfolio-tab', select); };
  }, [active, motionOn, reduced]);
  function keyboard(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault(); change(tabs[next].id, true);
  }
  return <main className={`console ${active === 'contact' ? 'contact-view' : ''}`}>
    <header className="console-header"><a href="/" className="console-brand" aria-label="Shyaam P, overview">S<span>/</span>P</a><nav className="tab-bar" aria-label="Portfolio sections" role="tablist">{tabs.map((tab, index) => <button key={tab.id} ref={node => { tabRefs.current[index] = node; }} id={`tab-${tab.id}`} role="tab" aria-selected={active === tab.id} aria-controls="panel-${tab.id}" tabIndex={active === tab.id ? 0 : -1} onClick={() => change(tab.id)} onKeyDown={event => keyboard(event, index)}><span>{tab.label}</span><small>{tab.index}</small></button>)}</nav><span className="console-status"><i /> OPEN TO IDEAS</span></header>
    <section className="console-grid"><section className="info-panel" ref={panel} role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} tabIndex={-1} key={active}><div className="panel-meta"><span>SHYAAM P / SOFTWARE SYSTEMS</span><span>COIMBATORE, IN</span></div><div className="view-content"><Content view={active} projects={projects} unavailable={unavailable} /></div><div className="panel-bottom"><span>INTEGRATED M.SC. / 2025—2030</span><span>DESIGNED TO KEEP EXPLORING <Arrow /></span></div></section>
      <section className={`visual-panel visual-${active}`} aria-label={active === 'contact' ? 'ASCII particle field' : 'ASCII aircraft technical drawing'}><AsciiStage view={active} reduced={reduced || !motionOn} /><div className="visual-top"><span>FIG. {tabs.find(t => t.id === active)?.index}</span><span>{active === 'signal' || active === 'projects' ? 'AIRFRAME / 001' : active.toUpperCase() + ' / FIELD'}</span></div><div className="visual-label label-top">POINT FIELD<br />σ 0.024</div><div className="visual-label label-bottom">X {active === 'journey' ? '2030' : '017.42'}<br />Y 011.08 / z 004</div><div className="axis axis-x" /><div className="axis axis-y" /><div className="crosshair" /></section></section>
    <footer className="console-footer"><span>© {new Date().getFullYear()} SHYAAM P</span><span className="footer-coordinates">FIG. {tabs.find(t => t.id === active)?.index} <b>·</b> {tabs.find(t => t.id === active)?.label.toUpperCase()}</span><button className="motion-switch" aria-pressed={motionOn} onClick={() => { const next = !motionOn; setMotionOn(next); document.documentElement.dataset.motion = next ? 'on' : 'off'; window.dispatchEvent(new Event('motionchange')); }}>{motionOn ? 'MOTION ON' : 'MOTION OFF'}</button><a href="https://github.com/ShyaamPrakash" target="_blank" rel="noreferrer">GITHUB <Arrow diagonal /></a></footer>
  </main>;
}
