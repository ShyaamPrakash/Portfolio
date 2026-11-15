'use client';

import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'lenis/dist/lenis.css';

export function Motion() {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let teardown = () => {};
    function setup() {
      teardown();
      const stop = paused || media.matches;
      document.documentElement.dataset.motion = stop ? 'off' : 'on';
      window.dispatchEvent(new Event('motionchange'));
      if (stop) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = new Lenis({ autoRaf: false, duration: .7, anchors: true });
      lenis.on('scroll', ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      const context = gsap.context(() => {
        gsap.fromTo('.hero-title', { y: 18 }, { y: 0, duration: .28, ease: 'power3.out' });
        gsap.to('.hero-orbit', { rotation: 16, y: 45, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .2 } });
        gsap.fromTo('.work-heading', { x: -18 }, { x: 0, duration: .26, ease: 'power3.out', scrollTrigger: { trigger: '#work', start: 'top 80%', once: true } });
      });
      teardown = () => { context.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
    }
    setup();
    media.addEventListener('change', setup);
    return () => { teardown(); media.removeEventListener('change', setup); };
  }, [paused]);
  return <button className="motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Resume motion' : 'Pause motion'}</button>;
}
