import { useEffect, useRef, useState } from 'react';
import styles from '../v2.module.css';

/* Chart geometry (viewBox units). */
const W = 640;
const H = 560;
const CX = 320;
const CY = 292;
const R = 178;
const RINGS = [0.25, 0.5, 0.75, 1];

/** Illustrative coverage, not measurements. */
const AXES = [
  { label: 'EVERYDAY SCENES', generic: 0.92, needed: 0.98 },
  { label: 'COMMON OBJECTS', generic: 0.9, needed: 0.95 },
  { label: 'TYPICAL ANGLES', generic: 0.84, needed: 0.96 },
  { label: 'STANDARD LIGHT', generic: 0.78, needed: 0.94 },
  { label: 'RARE OBJECTS', generic: 0.3, needed: 0.95 },
  { label: 'UNUSUAL PLACES', generic: 0.2, needed: 0.97 },
  { label: 'ODD LIGHTING', generic: 0.16, needed: 0.93 },
  { label: 'EDGE-CASE ACTIONS', generic: 0.26, needed: 0.96 },
];

const POINTS = [
  'More everyday data keeps filling the same broad middle of the distribution.',
  'Rare objects, odd lighting and unusual places stay uncovered, and that is where models fail.',
  'Purpose-built data for those narrow cases closes the gap.',
];

const angle = (i: number) => -Math.PI / 2 + (i * 2 * Math.PI) / AXES.length;
const pt = (i: number, k: number) => ({
  x: CX + Math.cos(angle(i)) * R * k,
  y: CY + Math.sin(angle(i)) * R * k,
});
const poly = (k: (i: number) => number) =>
  AXES.map((_, i) => {
    const p = pt(i, k(i));
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(' ');

export function Plateau() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      queueMicrotask(() => setSeen(true));
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id='why'
      className={styles.plateau}
    >
      <div className={styles.plateauGrain} />
      <div className={styles.plateauInner}>
        <div className={styles.plateauCopy}>
          <span className={styles.plateauTag}>Why more isn&apos;t better</span>
          <h2 className={`${styles.heading} ${styles.plateauTitle}`}>
            Generic data
            <br />
            stops paying off
          </h2>
          <p className={styles.plateauLead}>
            Everyday datasets cover the broad middle of what a model sees. Add more of them and the
            shape barely changes: the same scenes, the same lighting, the same angles.
          </p>
          <p className={styles.plateauText}>
            What&apos;s missing sits at the edges — rare objects, odd lighting, unusual places,
            unexpected actions. That is where models fail and where generic data never reaches.
            Data produced for those exact cases fills the gap.
          </p>
          <ul className={styles.plateauPoints}>
            {POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div
          ref={ref}
          className={styles.chartWrap}
          data-seen={seen}
        >
          <svg
            className={styles.chart}
            viewBox={`0 0 ${W} ${H}`}
            role='img'
            aria-label='Illustrative radar chart: generic datasets cover everyday scenarios well but leave rare objects, odd lighting, unusual places and edge-case actions uncovered; targeted data fills that gap.'
          >
            {/* rings and spokes */}
            {RINGS.map((k) => (
              <polygon
                key={k}
                className={styles.radarRing}
                points={poly(() => k)}
              />
            ))}
            {AXES.map((axis, i) => (
              <line
                key={axis.label}
                className={styles.radarRing}
                x1={CX}
                y1={CY}
                x2={pt(i, 1).x}
                y2={pt(i, 1).y}
              />
            ))}

            {/* required coverage (targeted data fills it) */}
            <polygon
              className={`${styles.radarShape} ${styles.radarNeeded}`}
              points={poly((i) => AXES[i]!.needed)}
            />
            {/* what generic datasets cover */}
            <polygon
              className={`${styles.radarShape} ${styles.radarGeneric}`}
              style={{ transitionDelay: '0.25s' }}
              points={poly((i) => AXES[i]!.generic)}
            />
            {AXES.map((axis, i) => (
              <circle
                key={`d${axis.label}`}
                className={styles.radarDot}
                cx={pt(i, axis.generic).x}
                cy={pt(i, axis.generic).y}
                r='3.5'
              />
            ))}

            {/* axis labels */}
            {AXES.map((axis, i) => {
              const p = pt(i, 1.13);
              const c = Math.cos(angle(i));
              const anchor = Math.abs(c) < 0.2 ? 'middle' : c > 0 ? 'start' : 'end';
              return (
                <text
                  key={`l${axis.label}`}
                  className={styles.radarLabel}
                  x={p.x + (anchor === 'start' ? 4 : anchor === 'end' ? -4 : 0)}
                  y={p.y + 4}
                  textAnchor={anchor}
                >
                  {axis.label}
                </text>
              );
            })}

            {/* callout on the gap */}
            <g transform='translate(436 462)'>
              <rect
                className={styles.chartChip}
                width='196'
                height='28'
                rx='7'
              />
              <text
                className={styles.chartChipText}
                x='98'
                y='18'
                textAnchor='middle'
              >
                TARGETED DATA SPACE
              </text>
            </g>

            {/* title chip */}
            <g transform='translate(0 8)'>
              <rect
                className={styles.chartChipLight}
                width='168'
                height='28'
                rx='7'
              />
              <text
                className={styles.chartChipTextDark}
                x='84'
                y='18'
                textAnchor='middle'
              >
                SCENARIO COVERAGE
              </text>
            </g>

            {/* legend */}
            <g transform='translate(396 8)'>
              <rect
                className={styles.chartChip}
                width='108'
                height='28'
                rx='7'
              />
              <rect
                className={styles.legendGeneric}
                x='12'
                y='10'
                width='16'
                height='8'
                rx='1.5'
              />
              <text
                className={styles.chartChipText}
                x='36'
                y='18'
              >
                GENERIC
              </text>
            </g>
            <g transform='translate(512 8)'>
              <rect
                className={styles.chartChip}
                width='120'
                height='28'
                rx='7'
              />
              <rect
                className={styles.legendTargeted}
                x='12'
                y='10'
                width='16'
                height='8'
                rx='1.5'
              />
              <text
                className={styles.chartChipText}
                x='36'
                y='18'
              >
                TARGETED
              </text>
            </g>
          </svg>
          <p className={styles.chartNote}>Illustrative schematic, not measured data.</p>
        </div>
      </div>
    </section>
  );
}
