'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
const RiveEmblem = dynamic(() => import('./RiveEmblem'), { ssr: false });

export function SignalEmblem() {
  const [enabled, setEnabled] = useState(false);
  const src = process.env.NEXT_PUBLIC_RIVE_SRC;
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setEnabled(!media.matches && !document.hidden && document.documentElement.dataset.motion !== 'off');
    update(); media.addEventListener('change', update); window.addEventListener('motionchange', update); document.addEventListener('visibilitychange', update);
    return () => { media.removeEventListener('change', update); window.removeEventListener('motionchange', update); document.removeEventListener('visibilitychange', update); };
  }, []);
  return <span className="signal-emblem" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M4 20h8l4-12 8 24 4-12h8" fill="none" stroke="currentColor" strokeWidth="2" /></svg>{enabled && src?.startsWith('/rive/') && <RiveEmblem src={src} />}</span>;
}
