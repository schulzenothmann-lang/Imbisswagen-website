// Imbissanhänger in der Draufsicht (Nase/Deichsel zeigt standardmäßig nach
// oben = Fahrtrichtung). Ein heller Halo hebt ihn von der Streckenlinie ab.
export function TrailerMarker({
  x,
  y,
  angle,
  scale = 1,
  className = "text-graphit",
}: {
  x: number;
  y: number;
  angle: number;
  scale?: number;
  className?: string;
}) {
  const kreide = "var(--color-kreide)";
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle}) scale(${scale})`} className={className}>
      {/* Halo: räumt die Strecke unter dem Anhänger frei */}
      <rect x="-13" y="-20" width="26" height="40" rx="7" fill={kreide} />

      {/* Deichsel mit Kupplung */}
      <line x1="0" y1="-14" x2="0" y2="-22" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="0" cy="-22.5" r="1.8" fill="currentColor" />

      {/* Räder */}
      <rect x="-11.5" y="-2" width="3" height="12" rx="1.5" fill="currentColor" />
      <rect x="8.5" y="-2" width="3" height="12" rx="1.5" fill="currentColor" />

      {/* Korpus */}
      <rect x="-9" y="-14" width="18" height="30" rx="3.5" fill="currentColor" />

      {/* Serviceklappe (helle Kante) + Dachlinie */}
      <rect x="-6" y="-9" width="12" height="4" rx="1" fill={kreide} opacity="0.85" />
      <rect x="-6" y="6" width="12" height="2.5" rx="1.25" fill={kreide} opacity="0.35" />
    </g>
  );
}
