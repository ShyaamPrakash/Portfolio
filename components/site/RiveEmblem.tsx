'use client';
import { useRive } from '@rive-app/react-canvas';
import { useState } from 'react';

export default function RiveEmblem({ src }: { src: string }) {
  const [failed, setFailed] = useState(false);
  const { RiveComponent } = useRive({ src, stateMachines: process.env.NEXT_PUBLIC_RIVE_STATE_MACHINE || undefined, autoplay: true, onLoadError: () => setFailed(true) });
  return failed ? null : <span className="rive-layer"><RiveComponent /></span>;
}
