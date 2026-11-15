'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Field() {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const values = new Float32Array(4200 * 3);
    for (let i = 0; i < 4200; i++) {
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      const y = 1 - i / 4199 * 2;
      const radius = Math.sqrt(1 - y * y);
      const ripple = 1 + .15 * Math.sin(theta * 3 + y * 7);
      values[i * 3] = Math.cos(theta) * radius * ripple * 1.7;
      values[i * 3 + 1] = y * 1.7;
      values[i * 3 + 2] = Math.sin(theta) * radius * ripple * 1.7;
    }
    return values;
  }, []);
  useFrame((state, delta) => {
    if (!points.current) return;
    points.current.rotation.y += Math.min(delta, .04) * .035;
    points.current.rotation.x = THREE.MathUtils.damp(points.current.rotation.x, state.pointer.y * .12, 3, delta);
    points.current.rotation.z = THREE.MathUtils.damp(points.current.rotation.z, -.18 + state.pointer.x * .08, 3, delta);
  });
  return <points ref={points}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><pointsMaterial color="#f1efea" size={.014} transparent opacity={.64} sizeAttenuation /></points>;
}
export default function SignalScene() {
  return <div className="three-scene"><Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 48 }} gl={{ alpha: true, antialias: false }}><Field /></Canvas></div>;
}
