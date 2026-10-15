import { useState } from 'react';
import styles from '../v2.module.css';

/* Chart geometry (viewBox units). Axes run clockwise from the top. */
const CX = 300;
const CY = 300;
const R = 190;
const ANGLES = [-90, -30, 30, 90, 150, 210].map((d) => (d * Math.PI) / 180);
const RING_LEVELS = [0.25, 0.5, 0.75];
const CORNER = 30;

/** Illustrative coverage by ready-made data per axis (0..1), not measurements. */
const AREAS = [
  { name: 'Egocentric', values: [0.85, 0.7, 0.55, 0.4, 0.3, 0.45] },
  { name: 'Physical AI', values: [0.6, 0.5, 0.4, 0.35, 0.45, 0.3] },
  { name: 'Agro data', values: [0.7, 0.55, 0.6, 0.45, 0.5, 0.4] },
  { name: 'Documents', values: [0.9, 0.8, 0.7, 0.6, 0.5, 0.55] },
];

const AXES = [
  {
    name: 'Scenario',
    text: 'The exact action your model has to learn, often rare and rarely filmed.',
    label: { x: 300, y: 74, anchor: 'middle' },
  },
  {
    name: 'Conditions',
    text: 'Your lighting, weather and time of day, not whatever was available.',
    label: { x: 494, y: 187, anchor: 'start' },
  },
  {
    name: 'Camera & gear',
    text: 'Your mounting position, sensor and resolution.',
    label: { x: 494, y: 418, anchor: 'start' },
  },
  {
    name: 'Location',
    text: 'Your city or your kind of place.',
    label: { x: 300, y: 536, anchor: 'middle' },
  },
  {
    name: 'Rights',
    text: 'Signed likeness releases and terms that allow commercial training.',
    label: { x: 106, y: 418, anchor: 'end' },
  },
  {
    name: 'Labels & format',
    text: 'Annotations on your schema, delivered in your format.',
    label: { x: 106, y: 187, anchor: 'end' },
  },
] as const;

type Point = [number, number];

const f1 = (n: number) => n.toFixed(1);

const vertices = (k: number): Point[] =>
  ANGLES.map((a): Point => [CX + R * k * Math.cos(a), CY + R * k * Math.sin(a)]);

/** Hexagon with rounded corners, scaled by `k`. */
function roundedHex(k: number) {
  const pts = vertices(k);
  const cut = CORNER * k;
  const toward = (from: Point, to: Point): Point => {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const len = Math.hypot(dx, dy);
    return [from[0] + (dx / len) * cut, from[1] + (dy / len) * cut];
  };
  let d = '';
  pts.forEach((p, i) => {
    const prev = pts[(i + 5) % 6]!;
    const next = pts[(i + 1) % 6]!;
    const a = toward(p, prev);
    const b = toward(p, next);
    d += `${i === 0 ? 'M' : 'L'}${f1(a[0])},${f1(a[1])} Q${f1(p[0])},${f1(p[1])} ${f1(b[0])},${f1(b[1])} `;
  });
  return `${d}Z`;
}

/** Smooth closed curve through the points (Catmull-Rom to Bezier). */
function smoothShape(pts: Point[]) {
  const n = pts.length;
  const t = 1 / 5;
  let d = `M${f1(pts[0]![0])},${f1(pts[0]![1])}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i + n - 1) % n]!;
    const p1 = pts[i]!;
    const p2 = pts[(i + 1) % n]!;
    const p3 = pts[(i + 2) % n]!;
    d += ` C${f1(p1[0] + (p2[0] - p0[0]) * t)},${f1(p1[1] + (p2[1] - p0[1]) * t)} ${f1(p2[0] - (p3[0] - p1[0]) * t)},${f1(p2[1] - (p3[1] - p1[1]) * t)} ${f1(p2[0])},${f1(p2[1])}`;
  }
  return `${d} Z`;
}

const OUTER_HEX = roundedHex(1);
const RINGS = RING_LEVELS.map((k) => ({ k, d: roundedHex(k) }));

export function Plateau() {
  const [area, setArea] = useState(0);
  const [axis, setAxis] = useState(0);

  const values = AREAS[area]!.values;
  const points = values.map(
    (v, i): Point => [CX + R * v * Math.cos(ANGLES[i]!), CY + R * v * Math.sin(ANGLES[i]!)],
  );
  const shape = smoothShape(points);

  return (
    <section
      id='why'
      className={styles.coverage}
    >
      <div className={styles.coverageInner}>
        <div className={styles.coverageHead}>
          <h2 className={`${styles.heading} ${styles.coverageTitle}`}>
            Ready-made data gets you most of the way. We make the rest.
          </h2>
          <p className={styles.coverageLead}>
            Open and off-the-shelf datasets cover the common cases. Where your requirement gets
            specific, we produce data to your spec.
          </p>
        </div>

        <div
          className={styles.coverageTabs}
          role='group'
          aria-label='Area of application'
        >
          {AREAS.map((item, i) => (
            <button
              key={item.name}
              type='button'
              className={styles.coverageTab}
              aria-pressed={i === area}
              onClick={() => setArea(i)}
            >
              {item.name}
            </button>
          ))}
        </div>

        <figure className={styles.coverageFigure}>
          <svg
            className={styles.coverageChart}
            viewBox='-60 40 740 530'
            role='img'
            aria-label="Radar chart of how much of a buyer's requirement ready-made data covers on six axes: scenario, conditions, camera and gear, location, rights, labels and format. The list below the chart describes each axis."
          >
            <path
              className={styles.coverageMade}
              fillRule='evenodd'
              d={`${OUTER_HEX} ${shape}`}
            />
            {RINGS.map((ring) => (
              <path
                key={ring.k}
                className={styles.coverageRing}
                d={ring.d}
              />
            ))}
            <path
              className={styles.coverageShape}
              d={shape}
            />
            {points.map((p, i) => {
              const active = i === axis;
              return (
                <circle
                  key={AXES[i]!.name}
                  className={styles.coverageDot}
                  data-active={active}
                  cx={f1(p[0])}
                  cy={f1(p[1])}
                  r={active ? 10 : 5.5}
                />
              );
            })}
            {AXES.map((item) => (
              <text
                key={item.name}
                className={styles.coverageAxisLabel}
                x={item.label.x}
                y={item.label.y}
                textAnchor={item.label.anchor}
              >
                {item.name}
              </text>
            ))}
          </svg>
        </figure>

        <div className={styles.coverageLegend}>
          <span className={styles.coverageLegendItem}>
            <span className={styles.coverageSwatchCovered} />
            Covered by ready-made data
          </span>
          <span className={styles.coverageLegendItem}>
            <span className={styles.coverageSwatchMade} />
            Made to your spec by Kvetio
          </span>
        </div>

        <ul className={styles.coverageAxes}>
          {AXES.map((item, i) => (
            <li key={item.name}>
              <button
                type='button'
                className={styles.coverageAxis}
                data-active={i === axis}
                onClick={() => setAxis(i)}
                onMouseEnter={() => setAxis(i)}
                onFocus={() => setAxis(i)}
              >
                <span className={styles.coverageAxisNum}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.coverageAxisBody}>
                  <span className={styles.coverageAxisName}>{item.name}</span>
                  <span className={styles.coverageAxisText}>{item.text}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        <p className={styles.coverageNote}>Illustrative shape, not measured data.</p>
      </div>
    </section>
  );
}
