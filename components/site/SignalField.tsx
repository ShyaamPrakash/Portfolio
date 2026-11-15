'use client';

import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Contour } from './Contour';

const Scene = dynamic(() => import('./SignalScene'), { ssr: false });
class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export function SignalField() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    const update = () => setActive(visible && !document.hidden && !media.matches && document.documentElement.dataset.motion !== 'off');
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    if (ref.current) observer.observe(ref.current);
    media.addEventListener('change', update);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('motionchange', update);
    return () => { observer.disconnect(); media.removeEventListener('change', update); document.removeEventListener('visibilitychange', update); window.removeEventListener('motionchange', update); };
  }, []);
  return <div ref={ref} className="signal-field" aria-hidden="true"><Contour className="hero-orbit" />{active && <SceneBoundary><Scene /></SceneBoundary>}<span className="field-coordinate">x 024 / y 116 / z 008</span><span className="ascii-fragment">.:+*#<br />/::+*<br />..:/.</span></div>;
}
