'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function Flight() {
  const host = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!host.current) return;
    const container = host.current;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true }); }
    catch { setFailed(true); return; }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#000000');
    scene.fog = new THREE.Fog(0x000000, 18, 80);
    const camera = new THREE.PerspectiveCamera(58, 1, .15, 160);
    const material = new THREE.MeshPhongMaterial({ color: 0xaaaaaa, shininess: 40 });
    const dark = new THREE.MeshPhongMaterial({ color: 0x242424, shininess: 20 });
    const bright = new THREE.MeshBasicMaterial({ color: 0xbcbcbc });
    scene.add(new THREE.AmbientLight(0xffffff, .35));
    const light = new THREE.PointLight(0xffffff, 75, 40, 1.3);
    camera.add(light); scene.add(camera);
    const gates: THREE.Group[] = [];
    const geometries = new Set<THREE.BufferGeometry>();
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1); geometries.add(boxGeometry);
    function block(parent: THREE.Group, position: number[], scale: number[], mat: THREE.Material = material) {
      const mesh = new THREE.Mesh(boxGeometry, mat);
      mesh.position.set(...position as [number,number,number]);
      mesh.scale.set(...scale as [number,number,number]); parent.add(mesh); return mesh;
    }
    function frame(size: number, thickness: number, depth: number) {
      const shape = new THREE.Shape();
      const half = size / 2;
      shape.moveTo(-half, -half); shape.lineTo(half, -half); shape.lineTo(half, half); shape.lineTo(-half, half); shape.closePath();
      const hole = new THREE.Path();
      const inside = half - thickness;
      hole.moveTo(-inside, -inside); hole.lineTo(-inside, inside); hole.lineTo(inside, inside); hole.lineTo(inside, -inside); hole.closePath();
      shape.holes.push(hole);
      const geometry = new THREE.ExtrudeGeometry(shape, { depth, bevelEnabled: true, bevelThickness: .055, bevelSize: .055, bevelSegments: 2 });
      geometries.add(geometry); return geometry;
    }

    for (let layer = 0; layer < 7; layer++) {
      const gate = new THREE.Group(); gate.position.z = -layer * 15;
      gate.rotation.z = [-.12, .18, -.24, .34, -.1, .2, -.2][layer];
      const outer = new THREE.Mesh(frame(8.2, .48, .75), material); gate.add(outer);
      const inner = new THREE.Mesh(frame(7.1, .07, .16), bright); inner.position.z = .83; gate.add(inner);
      const trim = new THREE.Mesh(frame(8.7, .045, .1), bright); trim.position.z = -.2; gate.add(trim);
      for (const side of [-1, 1]) {
        for (let i = 0; i < 17; i++) {
          const p = (i - 8) * .36;
          block(gate, [p, side * 4.07, 1], [.13, .25, .25], i % 4 ? dark : bright);
          block(gate, [side * 4.07, p, 1], [.25, .13, .25], i % 4 ? dark : bright);
        }
        for (const x of [-1, 1]) {
          block(gate, [x * 3.85, side * 3.85, 1.1], [.65, .65, .2], dark);
          block(gate, [x * 3.85, side * 3.85, 1.24], [.19, .19, .08], bright);
        }
      }
      // Fine circuit traces connect each layer to the next one in depth.
      for (const x of [-3.3, 3.3]) for (const y of [-3.3, 3.3]) {
        block(gate, [x, y, -7], [.025, .025, 14], bright);
      }
      if (layer % 4 === 1) {
        for (const side of [-1, 1]) for (let i = 0; i < 4; i++) {
          block(gate, [side * 4.6, (i - 1.5) * 1.55, .4], [.65, 1.1, .7], dark);
          block(gate, [side * 4.6, (i - 1.5) * 1.55, .81], [.42, .035, .05], bright);
        }
      } else if (layer % 4 === 2) {
        for (let i = 0; i < 14; i++) {
          block(gate, [(i - 6.5) * .52, 4.65, .3], [.28, .7, .65], material);
          block(gate, [(i - 6.5) * .52, -4.65, .3], [.28, .7, .65], material);
        }
      } else if (layer % 4 === 3) {
        const ringGeometry = new THREE.TorusGeometry(5.15, .045, 6, 96); geometries.add(ringGeometry);
        gate.add(new THREE.Mesh(ringGeometry, bright));
        for (const side of [-1, 1]) block(gate, [side * 4.8, 0, .4], [.25, 5.5, .35], material);
      }
      gates.push(gate); scene.add(gate);
    }
    const resolution = container.clientWidth < 600 ? .24 : .3;
    const effect = new AsciiEffect(renderer, ' .,:;+=itfLCG08@', { resolution, invert: true });
    effect.domElement.style.color = '#f65a49';
    effect.domElement.style.backgroundColor = '#080808';
    container.appendChild(effect.domElement);
    const measure = document.createElement('canvas').getContext('2d');
    const travel = { z: 13, roll: 0 };
    const resize = () => {
      const bounds = container.getBoundingClientRect();
      const width = Math.max(1, bounds.width), height = Math.max(1, bounds.height);
      effect.setSize(width, height);
      const table = effect.domElement.querySelector('table');
      if (table && measure) {
        measure.font = `${2 / resolution}px Courier New`;
        table.style.letterSpacing = `${1 / resolution - measure.measureText('M').width}px`;
      }
      camera.aspect = width / height;
      camera.fov = width < 600 ? 85 : 58;
      camera.updateProjectionMatrix();
    };
    resize(); const observer = new ResizeObserver(resize); observer.observe(container);
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const journey = gsap.timeline({ scrollTrigger: { trigger: '.flight-story', start: 'top top', end: 'bottom bottom', scrub: .55 } });
      journey.to(travel, { z: 9, duration: 1, ease: 'sine.inOut' });
      for (let i = 0; i < 4; i++) {
        journey.to(travel, { z: -6 - i * 15, roll: i % 2 ? -.065 : .065, duration: .65, ease: 'sine.inOut' })
          .to(travel, { z: -9 - i * 15, duration: .35, ease: 'none' });
      }
      gsap.to('.flight-title', { opacity: 0, y: -45, ease: 'none', scrollTrigger: { trigger: '.takeoff', start: 'top top', end: '70% top', scrub: .3 } });
    });
    let stopped = false, frameId = 0, last = 0, visible = true;
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }); intersection.observe(container);
    const toggle = () => {
      stopped = document.documentElement.dataset.motion === 'off' || preference.matches;
      ScrollTrigger.getAll().filter(trigger => trigger.trigger?.closest('.flight-story')).forEach(trigger => {
        if (stopped) { trigger.disable(false); trigger.animation?.pause(); }
        else trigger.enable();
      });
      if (preference.matches) { travel.z = 13; travel.roll = 0; }
    };
    toggle(); window.addEventListener('motionchange', toggle); preference.addEventListener('change', toggle);
    const draw = (time: number) => {
      frameId = requestAnimationFrame(draw);
      if (!visible || document.hidden || time - last < 40) return;
      last = time;
      camera.position.set(0, 0, travel.z);
      camera.rotation.set(0, 0, travel.roll);
      effect.render(scene, camera);
    };
    frameId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameId); context.revert(); observer.disconnect(); intersection.disconnect();
      window.removeEventListener('motionchange', toggle); preference.removeEventListener('change', toggle);
      geometries.forEach(geometry => geometry.dispose()); material.dispose(); dark.dispose(); bright.dispose(); renderer.dispose(); effect.domElement.remove();
    };
  }, []);
  return <div className="flight-render" ref={host} aria-hidden="true">{failed && <pre className="plane-fallback">{'╔══════════════╗\n║  ┌────────┐  ║\n║  │ [CORE] │  ║\n║  └────────┘  ║\n╚══════════════╝'}</pre>}</div>;
}
