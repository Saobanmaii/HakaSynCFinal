"use client";

interface RadarPoint {
  axis: string;
  value: number;
}

export default function RadarChart({ data }: { data: RadarPoint[] }) {
  const SIZE = 260;
  const CX = SIZE / 2;
  const CY = SIZE / 2;
  const MAX_R = 90;
  const LABEL_R = MAX_R + 22;
  const LEVELS = 4;
  const N = data.length;

  function polar(index: number, r: number) {
    const angle = (Math.PI * 2 * index) / N - Math.PI / 2;
    return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
  }

  const rings = Array.from({ length: LEVELS }, (_, lvl) => {
    const r = (MAX_R * (lvl + 1)) / LEVELS;
    const pts = data
      .map((_, i) => {
        const p = polar(i, r);
        return `${p.x},${p.y}`;
      })
      .join(" ");
    return <polygon key={lvl} points={pts} fill="none" stroke="#E0D9D2" strokeWidth="1" />;
  });

  const spokes = data.map((_, i) => {
    const p = polar(i, MAX_R);
    return <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} stroke="#E0D9D2" strokeWidth="1" />;
  });

  const dataPts = data
    .map((d, i) => {
      const p = polar(i, (d.value / 100) * MAX_R);
      return `${p.x},${p.y}`;
    })
    .join(" ");

  const dots = data.map((d, i) => {
    const p = polar(i, (d.value / 100) * MAX_R);
    return (
      <circle key={i} cx={p.x} cy={p.y} r="4" fill="#FFD034" stroke="white" strokeWidth="1.5" />
    );
  });

  const labelEls = data.map((d, i) => {
    const p = polar(i, LABEL_R);
    const anchor = p.x < CX - 4 ? "end" : p.x > CX + 4 ? "start" : "middle";
    return (
      <text
        key={i}
        x={p.x}
        y={p.y}
        textAnchor={anchor}
        dominantBaseline="middle"
        fontSize="10"
        fill="#8B8B8B"
        fontFamily="Poppins, sans-serif"
      >
        {d.axis}
      </text>
    );
  });

  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {rings}
      {spokes}
      <polygon
        points={dataPts}
        fill="rgba(255,208,52,0.18)"
        stroke="#FFD034"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {dots}
      {labelEls}
    </svg>
  );
}
