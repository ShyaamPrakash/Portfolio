import type { Project } from '@/lib/projects/types';

const motifs = [
  { name: 'finance', art: <><rect x="-115" y="-75" width="230" height="155" rx="18"/><path d="M-115-30h230M30 0h105v50H30z"/><circle cx="60" cy="25" r="7"/><circle cx="-42" cy="-100" r="42"/><path d="M-42-122v44m16-35c-30-18-48 9-17 15s11 28-15 11"/></> },
  { name: 'operations', art: <><path d="M-80-125h160v250l-20-12-20 12-20-12-20 12-20-12-20 12-20-12-20 12z"/><path d="M-45-85h90M-45-45h65M-45-5h90M-45 35h50M-45 85h90"/><circle cx="111" cy="55" r="45"/><path d="m88 55 16 16 30-35"/></> },
  { name: 'sentiment', art: <><path d="M-125-95h250V65H10l-65 55V65h-70z"/><path d="M-65-40h35m60 0h35M-50 10q50 55 100 0"/><circle cx="-50" cy="-40" r="4"/><circle cx="50" cy="-40" r="4"/></> },
  { name: 'signal', art: <><rect x="-130" y="-90" width="260" height="180" rx="28"/><circle r="62"/><circle r="38"/><path d="M-70-90l20-30h100l20 30M80-55h20M-170 0h30m280 0h30M0-160v25m0 130v25"/></> },
  { name: 'notebook', art: <><path d="M-105-120h210v240h-210zM-60-120v240"/>{[-85,-42,0,42,85].map(y=><path key={y} d={`M-123 ${y}h34`}/>)}<path d="M-25-65h95M-25-25h95M-25 15h65m-65 40h80"/></> },
  { name: 'code', art: <><rect x="-145" y="-100" width="290" height="200" rx="12"/><path d="M-145-60h290m-200-20h1m20 0h1m20 0h1M-45-25l-38 40 38 40m90-80 38 40-38 40m-30-95-30 110"/></> },
  { name: 'architecture', art: <><path d="m-140-5 140-115L140-5M-105-30v150h210V-30M-25 120V35h50v85M-75 5h25v30h-25zM50 5h25v30H50z"/><path d="M-155 120h310M-155 145h310"/></> },
  { name: 'search', art: <><circle cx="-25" cy="-25" r="95"/><circle cx="-25" cy="-25" r="68"/><path d="m45 45 100 100m-80-82 105 100M-65-25h80m-40-40v80"/></> },
  { name: 'network', art: <>{[-105,0,105].flatMap((x,i)=>[-85,0,85].map((y,j)=><g key={`${x}-${y}`}><circle cx={x} cy={y} r={i===1?18:12}/>{i<2&&<path d={`M${x+15} ${y}L${x+90} ${j===0?85:j===2?-85:0}`} opacity=".45"/>}</g>))}</> },
  { name: 'data', art: <>{[-75,-5,65].map(y=><g key={y}><ellipse cy={y} rx="110" ry="30"/><path d={`M-110 ${y}v45c0 40 220 40 220 0v-45`}/></g>)}</> },
  { name: 'interface', art: <><rect x="-145" y="-105" width="290" height="210" rx="12"/><path d="M-145-65h290M-100-20h75v80h-75zM5-20h95M5 10h95M5 40h60M-105-85h1m20 0h1m20 0h1"/></> },
  { name: 'machine-learning', art: <><path d="m0-130 110 65v130L0 130-110 65V-65zM0 0v130M-110-65 0 0l110-65M0-130V0M-110 65 0 0l110 65"/><circle r="35"/></> },
  { name: 'audio', art: <>{Array.from({length:13},(_,i)=><path key={i} d={`M${(i-6)*21} ${(-(18+Math.sin(i*.7)**2*100)).toFixed(2)}v${(36+Math.sin(i*.7)**2*200).toFixed(2)}`}/>)}<circle r="150" strokeWidth="1"/></> },
  { name: 'systems', art: <><rect x="-80" y="-80" width="160" height="160" rx="10"/><rect x="-48" y="-48" width="96" height="96"/>{[-60,-30,0,30,60].map(v=><path key={v} d={`M${v}-115v35m0 160v35M-115 ${v}h35m160 0h35`}/>)}</> },
];

export function projectCoverVariants(projects: Project[]) {
  const used = new Set<number>();
  return projects.map(project => {
    const text = `${project.name} ${project.description} ${project.tech_tags.join(' ')}`.toLowerCase();
    let variant = /cash|buck|financ|money/.test(text) ? 0 : /canteen|ledger|order/.test(text) ? 1 : /critic|emotion|review/.test(text) ? 2 : /photo|camera|snap/.test(text) ? 3 : /notebook|notes|eda/.test(text) ? 4 : /house|estate|market/.test(text) ? 6 : /search|semantic/.test(text) ? 7 : /database|sql|hospital|medic/.test(text) ? 9 : /web|interface|frontend/.test(text) ? 10 : /predict|learning|model|\bml\b/.test(text) ? 11 : /audio|music|sound/.test(text) ? 12 : /\bc\+\+\b|system|compiler/.test(text) ? 13 : 5;
    for (let attempt = 0; used.has(variant) && attempt < motifs.length; attempt++) variant = (variant + 1) % motifs.length;
    used.add(variant);
    return variant;
  });
}

export function ProjectCover({ project, variant = 5 }: { project: Project; variant?: number }) {
  const motif = motifs[variant % motifs.length];
  return <svg className="project-cover" data-motif={motif.name} viewBox="0 0 720 440" role="img" aria-label={`${motif.name} illustration for ${project.display_title || project.name}`}>
    <rect width="720" height="440" fill="#160e0c"/>
    <circle cx={360 + (variant % 3 - 1) * 60} cy="220" r="176" fill="#29120e"/>
    <circle cx="360" cy="220" r="188" fill="none" stroke="#693128" strokeDasharray="2 12"/>
    <path d="M32 62V32h30m596 0h30v30M32 378v30h30m596 0h30v-30" fill="none" stroke="#ac6960"/>
    <svg className="project-icon" x="180" y="40" width="360" height="360" viewBox="-180 -180 360 360" preserveAspectRatio="xMidYMid meet" overflow="visible" aria-hidden="true">
      <g stroke="#fb6651" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">{motif.art}</g>
    </svg>
  </svg>;
}
