'use client';

import { useEffect, useRef } from 'react';
import type { View } from './PortfolioConsole';

const shades = ' .,:;+=xX#%@';

export function AsciiStage({ view, reduced }: { view: View; reduced: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const context = element?.getContext('2d');
    if (!element || !context) return;
    let frame = 0;
    let width = 0;
    let height = 0;
    let lastPaint = 0;
    let paused = reduced;
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(devicePixelRatio || 1, 1.5);
      element.width = width * ratio;
      element.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      lastPaint = 0;
    });
    resize.observe(element);
    const motion = () => { paused = document.documentElement.dataset.motion === 'off' || matchMedia('(prefers-reduced-motion: reduce)').matches; };
    motion();
    window.addEventListener('motionchange', motion);
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw);
      if (document.hidden || (paused && lastPaint)) return;
      if (!paused && time - lastPaint < 105) return;
      lastPaint = time;
      context.clearRect(0, 0, width, height);
      const mobile = width < 560;
      const font = mobile ? 8 : 10;
      const cellW = font * .62;
      const cols = Math.max(32, Math.floor(width / cellW));
      const rows = Math.max(18, Math.floor(height / (font * 1.45)));
      const cw = width / cols;
      const ch = height / rows;
      context.font = `${font}px "IBM Plex Mono", monospace`;
      context.textBaseline = 'top';
      const t = reduced || paused ? 0 : time / 850;
      const inSignal = view === 'signal' || view === 'projects';
      for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
        const nx = (x / cols - .5) * 2;
        const ny = (y / rows - .5) * 2;
        let intensity = 0;
        if (view === 'signal' || view === 'projects') {
          // Orthographic swept wing and fuselage, plotted as a technical wireframe.
          const pulse = Math.sin(t + nx * 7 + ny * 5) * .035;
          const fuselage = Math.abs(ny) < (.035 + Math.max(0, nx) * .12 + pulse) && nx > -.84 && nx < .9;
          const wing = nx > -.57 && nx < .34 && Math.abs(ny) < (.10 + (nx + .57) * .43 + pulse);
          const tail = nx > -.91 && nx < -.55 && Math.abs(ny) < (.025 + (nx + .91) * .38);
          const plane = fuselage || wing || tail;
          const edge = Math.min(Math.abs(Math.abs(ny) - (.035 + Math.max(0, nx) * .12)), Math.abs(Math.abs(ny) - (.10 + (nx + .57) * .43)), Math.abs(nx - .9), Math.abs(nx + .84));
          if (plane) intensity = .2 + .45 * (1 - Math.min(edge * 12, 1));
          const contour = .5 + .5 * Math.sin(nx * 32 + Math.sin(ny * 8 + t) * 3);
          if (Math.abs(contour - .53) < .035 && Math.abs(ny) < .48) intensity = Math.max(intensity, .27);
          if (view === 'projects') intensity *= .78;
        } else if (view === 'profile' || view === 'systems') {
          const d = Math.sqrt(nx * nx * 1.2 + ny * ny * .78);
          const shell = Math.abs(d - (.2 + .08 * Math.sin(nx * 4 + t * .5))) < .022;
          const cross = Math.abs(nx - ny * .64) < .018 || Math.abs(nx + ny * .64) < .018;
          if (shell || cross) intensity = .23 + .35 * (1 - d / 1.2);
        } else if (view === 'journey') {
          const orbit = Math.abs(Math.sqrt(nx * nx + ny * ny * 1.7) - (.24 + .06 * Math.sin(t + nx * 5))) < .02;
          const axis = Math.abs(nx) < .009 || Math.abs(ny) < .012;
          if (orbit || axis) intensity = .32;
        } else {
          const d = Math.sqrt(((nx + .06) ** 2) * 2 + ny * ny * .55);
          const clouds = Math.sin(nx * 28 + t) * Math.cos(ny * 19) + Math.sin((nx + ny) * 37);
          const cloud = d < .74 && clouds > -.15 + d * .82;
          if (cloud) intensity = .27 + Math.max(0, clouds) * .42;
        }
        const grain = (Math.sin(x * 127.1 + y * 311.7) * 43758.5453) % 1;
        intensity += grain > .75 && view === 'contact' ? .16 : 0;
        if (intensity > .12) {
          const character = shades[Math.min(shades.length - 1, Math.floor(intensity * shades.length))];
          context.globalAlpha = Math.min(.92, .25 + intensity);
          context.fillStyle = inSignal ? '#8fb9ff' : view === 'contact' ? '#292b29' : '#9ebcff';
          context.fillText(character, x * cw, y * ch);
        }
      }
      context.globalAlpha = 1;
    };
    frame = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener('motionchange', motion); };
  }, [view, reduced]);
  return <canvas ref={canvas} className={`ascii-canvas ${view === 'contact' ? 'cloud-canvas' : ''}`} aria-hidden="true" />;
}
