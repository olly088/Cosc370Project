interface ChartDataPoint {
  month: string;
  actual: number | null;
  projected: number;
}

interface SpendingChartProps {
  data: ChartDataPoint[];
}

interface Pt {
  x: number;
  y: number;
  projY: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function SpendingChart({ data }: SpendingChartProps) {
  const W = 700;
  const H = 320;
  const padL = 72;
  const padR = 24;
  const padT = 16;
  const padB = 44;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;

  if (data.length === 0) return null;

  const maxVal =
    Math.max(...data.map(d => Math.max(d.actual ?? 0, d.projected))) * 1.12;

  const toX = (i: number) =>
    data.length === 1
      ? padL + chartW / 2
      : padL + (i / (data.length - 1)) * chartW;
  const toY = (v: number) => padT + chartH - (v / maxVal) * chartH;

  const pts: Pt[] = data
    .map((d, i) => ({
      x: toX(i),
      y: d.actual !== null ? toY(d.actual) : -1,
      projY: toY(d.projected),
    }))
    .filter(p => p.y !== -1);

  type Seg = { d: string; color: string };
  const segments: Seg[] = [];

  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const over1 = p1.y < p1.projY;
    const over2 = p2.y < p2.projY;

    if (over1 === over2) {
      segments.push({ d: `M${p1.x},${p1.y}L${p2.x},${p2.y}`, color: over1 ? '#dc2626' : '#16a34a' });
    } else {
      const da1 = p1.y - p1.projY;
      const da2 = p2.y - p2.projY;
      const t = da1 / (da1 - da2);
      const cx = lerp(p1.x, p2.x, t);
      const cy = lerp(p1.y, p2.y, t);
      segments.push({ d: `M${p1.x},${p1.y}L${cx},${cy}`, color: over1 ? '#dc2626' : '#16a34a' });
      segments.push({ d: `M${cx},${cy}L${p2.x},${p2.y}`, color: over2 ? '#dc2626' : '#16a34a' });
    }
  }

  const yTicks = [0, 0.25, 0.5, 0.75, 1.0].map(f => maxVal * f);
  const projPts = data.map((d, i) => `${toX(i)},${toY(d.projected)}`).join(' ');

  const fmtY = (v: number) => {
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
    if (v >= 1_000) return `$${Math.round(v / 1_000)}k`;
    return `$${Math.round(v)}`;
  };

  let breachX: number | null = null;
  let breachY: number | null = null;
  for (let i = 0; i < pts.length - 1; i++) {
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const over1 = p1.y < p1.projY;
    const over2 = p2.y < p2.projY;
    if (over1 !== over2 && over2) {
      const da1 = p1.y - p1.projY;
      const da2 = p2.y - p2.projY;
      const t = da1 / (da1 - da2);
      breachX = lerp(p1.x, p2.x, t);
      breachY = lerp(p1.y, p2.y, t);
      break;
    }
  }

  const showDots = data.length <= 12;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ minHeight: 240 }}>
      {/* Grid lines */}
      {yTicks.map((v, i) => {
        const y = toY(v);
        return (
          <g key={i}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e5e7eb" strokeWidth="1" />
            <text x={padL - 6} y={y + 4} textAnchor="end" fontSize="10" fill="#9ca3af" fontFamily="monospace">
              {fmtY(v)}
            </text>
          </g>
        );
      })}

      {/* Axes */}
      <line x1={padL} y1={padT} x2={padL} y2={padT + chartH} stroke="#d1d5db" strokeWidth="1" />
      <line x1={padL} y1={padT + chartH} x2={W - padR} y2={padT + chartH} stroke="#d1d5db" strokeWidth="1" />

      {/* Projected dashed line */}
      <polyline points={projPts} fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="5 4" />

      {/* Shaded area under actual line */}
      {pts.length > 1 && (
        <polygon
          points={`${pts.map(p => `${p.x},${p.y}`).join(' ')} ${pts[pts.length - 1].x},${padT + chartH} ${pts[0].x},${padT + chartH}`}
          fill="rgba(0,0,0,0.03)"
        />
      )}

      {/* Actual line colored segments */}
      {segments.map((seg, i) => (
        <path key={i} d={seg.d} fill="none" stroke={seg.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      ))}

      {/* Data point dots — only for ≤12 points */}
      {showDots && pts.map((p, i) => {
        const over = p.y < p.projY;
        return (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={over ? '#dc2626' : '#16a34a'} stroke="white" strokeWidth="1.5" />
        );
      })}

      {/* Budget breach annotation */}
      {breachX !== null && breachY !== null && (
        <g>
          <circle cx={breachX} cy={breachY} r="5" fill="none" stroke="#dc2626" strokeWidth="2" />
          <rect x={breachX - 68} y={breachY - 38} width={136} height={24} fill="#111" rx="2" />
          <text x={breachX} y={breachY - 22} textAnchor="middle" fontSize="9" fill="white" fontFamily="monospace" style={{ letterSpacing: 1 }}>
            BUDGET BREACH
          </text>
        </g>
      )}

      {/* X axis ticks + labels */}
      {data.map((d, i) => (
        <g key={i}>
          <line
            x1={toX(i)} y1={padT + chartH}
            x2={toX(i)} y2={padT + chartH + (d.month ? 5 : 3)}
            stroke={d.month ? '#9ca3af' : '#e5e7eb'}
            strokeWidth="1"
          />
          {d.month && (
            <text x={toX(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="#6b7280" fontFamily="monospace">
              {d.month}
            </text>
          )}
        </g>
      ))}

      {/* Legend */}
      <g transform={`translate(${padL + 8}, ${padT + 8})`}>
        <line x1="0" y1="6" x2="18" y2="6" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="23" y="9" fontSize="9" fill="#6b7280" fontFamily="monospace">PROJECTED</text>
        <line x1="80" y1="6" x2="98" y2="6" stroke="#16a34a" strokeWidth="2" />
        <text x="103" y="9" fontSize="9" fill="#6b7280" fontFamily="monospace">ACTUAL</text>
      </g>
    </svg>
  );
}
