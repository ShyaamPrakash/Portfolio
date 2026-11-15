export function Contour({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 600 600" fill="none" aria-hidden="true">
    {Array.from({ length: 38 }, (_, i) => {
      const r = 42 + i * 5.1;
      const points = Array.from({ length: 121 }, (_, j) => {
        const t = j / 120 * Math.PI * 2;
        const wave = r * (1 + .18 * Math.sin(t * 3 + i * .065));
        return `${(300 + Math.cos(t) * wave).toFixed(2)},${(300 + Math.sin(t) * wave * .86).toFixed(2)}`;
      }).join(' ');
      return <polyline key={i} points={points} stroke="currentColor" strokeWidth=".7" opacity={.25 + i / 75} />;
    })}
  </svg>;
}
