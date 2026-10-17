import type { Project } from '../../data/types';

/**
 * Small drawn UI sketches for projects that don't have screenshots yet.
 * Each one hints at what the product actually does, instead of showing initials.
 * Replace with real screenshots by adding images to the project in projects.ts.
 */
const W = 320;
const H = 180;

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="cover" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="cv-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} className="cover__bg" />
      <rect x="22" y="18" width={W - 44} height={H - 18} rx="8" className="cover__win" />
      <circle cx="34" cy="28" r="2.5" className="cover__dot" />
      <circle cx="42" cy="28" r="2.5" className="cover__dot" />
      <circle cx="50" cy="28" r="2.5" className="cover__dot" />
      <g transform="translate(22 38)">{children}</g>
      <rect x="22" y="18" width={W - 44} height="60" rx="8" fill="url(#cv-sheen)" />
    </svg>
  );
}

const line = (x: number, y: number, w: number, strong = false) => (
  <rect x={x} y={y} width={w} height="5" rx="2.5" className={strong ? 'cover__ink' : 'cover__mute'} />
);

const sketches: Record<NonNullable<Project['cover']>, () => React.JSX.Element> = {
  calendar: () => (
    <>
      {line(14, 8, 70, true)}
      {Array.from({ length: 3 }, (_, i) => (
        <g key={i} transform={`translate(14 ${24 + i * 34})`}>
          <rect width="120" height="26" rx="5" className="cover__card" />
          <circle cx="13" cy="13" r="7" className="cover__accent-soft" />
          {line(26, 7, 60, true)}
          {line(26, 15, 40)}
        </g>
      ))}
      {Array.from({ length: 20 }, (_, i) => (
        <rect key={i} x={150 + (i % 5) * 24} y={24 + Math.floor(i / 5) * 22} width="18" height="16" rx="4" className={i === 7 ? 'cover__accent' : 'cover__card'} />
      ))}
    </>
  ),
  gallery: () => (
    <>
      {[[14, 8, 80, 60], [100, 8, 60, 40], [166, 8, 96, 70], [100, 54, 60, 70], [14, 74, 80, 50], [166, 84, 96, 40]].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="5" className={i === 2 ? 'cover__accent-soft' : 'cover__card'} />
      ))}
      <path d="M180 60 l14 -16 l12 10 l10 -8 l30 22 z" className="cover__accent" opacity="0.6" />
    </>
  ),
  seats: () => (
    <>
      <path d="M60 10 Q138 0 216 10" className="cover__stroke" />
      {Array.from({ length: 48 }, (_, i) => {
        const r = Math.floor(i / 12);
        const c = i % 12;
        const taken = [3, 4, 15, 16, 17, 30, 41].includes(i);
        const pick = [20, 21].includes(i);
        return <rect key={i} x={44 + c * 16 + (c > 5 ? 10 : 0)} y={26 + r * 18} width="11" height="11" rx="3" className={pick ? 'cover__accent' : taken ? 'cover__mute' : 'cover__card'} />;
      })}
      <rect x="190" y="108" width="70" height="16" rx="8" className="cover__accent" />
    </>
  ),
  table: () => (
    <>
      {line(14, 8, 60, true)}
      <rect x="208" y="4" width="54" height="14" rx="7" className="cover__accent" />
      {Array.from({ length: 5 }, (_, i) => (
        <g key={i} transform={`translate(14 ${28 + i * 19})`}>
          <rect width="248" height="15" rx="3" className={i === 0 ? 'cover__mute' : 'cover__card'} />
          <circle cx="9" cy="7.5" r="4" className={i === 0 ? 'cover__mute' : 'cover__accent-soft'} />
          {line(20, 5, 60, i !== 0)}
          {line(110, 5, 50)}
          {line(190, 5, 36)}
        </g>
      ))}
    </>
  ),
  chart: () => (
    <>
      {line(14, 8, 70, true)}
      {[0, 1, 2].map((i) => <rect key={i} x={14 + i * 84} y="22" width="76" height="28" rx="5" className="cover__card" />)}
      <path d="M14 120 L50 98 L86 106 L122 80 L158 88 L194 62 L230 70 L262 54" className="cover__line" />
      <path d="M14 120 L50 98 L86 106 L122 80 L158 88 L194 62 L230 70 L262 54 L262 128 L14 128 Z" className="cover__area" />
    </>
  ),
  store: () => (
    <>
      {line(14, 8, 50, true)}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${14 + i * 63} 24)`}>
          <rect width="56" height="64" rx="5" className={i === 1 ? 'cover__accent-soft' : 'cover__card'} />
          {line(0, 72, 46, true)}
          {line(0, 82, 28)}
        </g>
      ))}
      <rect x="14" y="116" width="72" height="12" rx="6" className="cover__accent" />
    </>
  ),
  blocks: () => (
    <>
      <rect x="14" y="6" width="248" height="12" rx="3" className="cover__card" />
      <rect x="14" y="24" width="248" height="38" rx="4" className="cover__accent-soft" />
      <rect x="14" y="68" width="120" height="30" rx="4" className="cover__card" />
      <rect x="142" y="68" width="120" height="30" rx="4" className="cover__card" />
      <rect x="14" y="104" width="248" height="22" rx="4" className="cover__card" />
      <rect x="138" y="76" width="24" height="24" rx="4" className="cover__accent" transform="rotate(-8 150 88)" />
    </>
  ),
  storefront: () => (
    <>
      <rect x="14" y="4" width="248" height="10" rx="3" className="cover__accent-soft" />
      <rect x="14" y="22" width="110" height="104" rx="5" className="cover__card" />
      {line(136, 30, 100, true)}
      {line(136, 42, 60)}
      {[0, 1, 2].map((i) => <circle key={i} cx={142 + i * 16} cy="62" r="5" className={i === 0 ? 'cover__accent' : 'cover__mute'} />)}
      <rect x="136" y="80" width="90" height="16" rx="8" className="cover__accent" />
    </>
  ),
  cart: () => (
    <>
      {['Discover', 'Select', 'Cart', 'Checkout', 'Order'].map((_, i) => (
        <g key={i} transform={`translate(${24 + i * 56} 46)`}>
          <circle r="11" className={i <= 2 ? 'cover__accent' : 'cover__card'} />
          {i < 4 && <rect x="14" y="-1" width="28" height="2" className={i < 2 ? 'cover__accent' : 'cover__mute'} />}
        </g>
      ))}
      <rect x="14" y="78" width="248" height="46" rx="6" className="cover__card" />
      {line(26, 90, 120, true)}
      {line(26, 102, 80)}
      <rect x="196" y="96" width="54" height="16" rx="8" className="cover__accent" />
    </>
  ),
  signals: () => (
    <>
      <rect x="14" y="6" width="248" height="16" rx="8" className="cover__card" />
      <circle cx="26" cy="14" r="4" className="cover__accent" />
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(14 ${32 + i * 32})`}>
          {line(0, 0, 120, true)}
          {line(0, 10, 200)}
          {line(0, 18, 160)}
        </g>
      ))}
      <rect x="196" y="32" width="66" height="44" rx="5" className="cover__accent-soft" />
    </>
  ),
  security: () => (
    <>
      {/* Before: malware detected */}
      <g transform="translate(14 6)">
        <rect width="118" height="118" rx="8" className="cover__card" />
        <circle cx="20" cy="20" r="9" fill="#ff6b6b" />
        <rect x="18.8" y="14" width="2.4" height="8" rx="1" fill="#fff" />
        <circle cx="20" cy="25" r="1.3" fill="#fff" />
        {line(36, 14, 70, true)}
        {line(36, 24, 46)}
        <rect x="12" y="50" width="94" height="7" rx="3.5" className="cover__mute" />
        <rect x="12" y="50" width="86" height="7" rx="3.5" fill="#ff6b6b" />
        <text x="12" y="104" fontSize="10" fontWeight="700" fill="#ff8a8a" fontFamily="Inter, sans-serif">BEFORE</text>
      </g>
      {/* After: clean */}
      <g transform="translate(144 6)">
        <rect width="118" height="118" rx="8" className="cover__card" />
        <circle cx="20" cy="20" r="9" fill="#5fd99a" />
        <path d="M15.5 20.5l3 3 6-6.5" stroke="#0b0c10" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {line(36, 14, 66, true)}
        {line(36, 24, 50)}
        <rect x="12" y="50" width="94" height="7" rx="3.5" className="cover__mute" />
        <rect x="12" y="50" width="12" height="7" rx="3.5" fill="#5fd99a" />
        <text x="12" y="104" fontSize="10" fontWeight="700" fill="#7be0a5" fontFamily="Inter, sans-serif">AFTER</text>
      </g>
      <path d="M134 62 h8 m-4 -4 l4 4 l-4 4" stroke="rgba(200,205,214,0.6)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
    </>
  ),
  chat: () => (
    <>
      <rect x="14" y="6" width="150" height="22" rx="11" className="cover__card" />
      {line(26, 14.5, 110)}
      <rect x="112" y="36" width="150" height="22" rx="11" className="cover__accent-soft" />
      {line(124, 44.5, 110, true)}
      <circle cx="24" cy="78" r="9" className="cover__accent" />
      <rect x="40" y="66" width="200" height="40" rx="10" className="cover__card" />
      {line(52, 76, 160, true)}
      {line(52, 88, 120)}
      <rect x="14" y="114" width="248" height="14" rx="7" className="cover__mute" />
    </>
  ),
  nodes: () => {
    const pts = [[40, 70], [100, 30], [100, 110], [170, 70], [230, 30], [230, 110]];
    const links = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4], [3, 5]];
    return (
      <>
        {links.map(([a, b], i) => <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} className="cover__stroke" />)}
        {pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 3 ? 14 : 8} className={i === 3 ? 'cover__accent' : 'cover__card'} />)}
      </>
    );
  },
};

export function ProjectCover({ project }: { project: Project }) {
  const Sketch = sketches[project.cover ?? 'blocks'];
  return (
    <Frame label={`Illustration for ${project.title}`}>
      <Sketch />
    </Frame>
  );
}
