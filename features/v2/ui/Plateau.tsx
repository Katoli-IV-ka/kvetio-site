import { useEffect, useRef, useState } from 'react';
import styles from '../v2.module.css';

/* Chart geometry (viewBox units). */
const W = 640;
const H = 560;
const X0 = 56;
const X1 = 616;
const Y_BASE = 470;
const Y_TOP = 96;
const BARS = 36;
const SLOT = (X1 - X0) / BARS;
const BAR_W = 11;
const KNEE = 14; // bar index where generic data stops paying off

/** Illustrative curves, not measurements: gain per added batch of data. */
const generic = Array.from({ length: BARS }, (_, i) => 330 * Math.exp(-i / 8.5) + 10);
const targeted = Array.from({ length: BARS }, (_, i) =>
  i < KNEE ? 0 : 255 * Math.pow(0.975, i - KNEE) + 20,
);

const TICKS = [
  { i: 0, label: '1K' },
  { i: 9, label: '10K' },
  { i: 18, label: '100K' },
  { i: 27, label: '1M' },
  { i: 35, label: '10M' },
];

const POINTS = [
  'Each new batch of everyday data teaches the model less than the one before.',
  'Past the plateau, adding more of the same barely moves quality on the cases that matter.',
  'Purpose-built data for narrow, rare scenarios restores the gain.',
];

const barX = (i: number) => X0 + i * SLOT + (SLOT - BAR_W) / 2;

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

  const kneeX = X0 + KNEE * SLOT;

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
            Early on, every extra batch of everyday data lifts a model. Then the curve flattens:
            the same kind of data keeps arriving and the model keeps learning less from it.
          </p>
          <p className={styles.plateauText}>
            What&apos;s missing is the narrow, rare part of the distribution — the edge cases your
            model actually fails on. Generic datasets never reach it. Data produced for those exact
            cases is where the gain comes back.
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
            aria-label='Illustrative chart: the gain per added batch of generic data shrinks as the dataset grows, while targeted edge-case data restores the gain.'
          >
            {/* opportunity space */}
            <rect
              className={styles.chartZone}
              x={kneeX}
              y={Y_TOP - 20}
              width={X1 - kneeX + 12}
              height={Y_BASE - Y_TOP + 36}
              rx='14'
            />
            <text
              className={styles.chartZoneLabel}
              x={kneeX + (X1 - kneeX) / 2}
              y={Y_TOP + 4}
              textAnchor='middle'
            >
              TARGETED DATA OPPORTUNITY SPACE
            </text>

            {/* baseline and ticks */}
            <line
              className={styles.chartAxis}
              x1={X0 - 8}
              x2={X1 + 12}
              y1={Y_BASE}
              y2={Y_BASE}
            />
            {TICKS.map((tick) => (
              <g key={tick.label}>
                <line
                  className={styles.chartAxis}
                  x1={barX(tick.i) + BAR_W / 2}
                  x2={barX(tick.i) + BAR_W / 2}
                  y1={Y_BASE}
                  y2={Y_BASE + 7}
                />
                <text
                  className={styles.chartTick}
                  x={barX(tick.i) + BAR_W / 2}
                  y={Y_BASE + 26}
                  textAnchor='middle'
                >
                  {tick.label}
                </text>
              </g>
            ))}

            {/* bars: targeted behind, generic in front */}
            {targeted.map((value, i) =>
              value > 0 ? (
                <rect
                  key={`t${i}`}
                  className={`${styles.bar} ${styles.barTargeted}`}
                  style={{ transitionDelay: `${0.5 + (i - KNEE) * 0.035}s` }}
                  x={barX(i)}
                  y={Y_BASE - value}
                  width={BAR_W}
                  height={value}
                  rx='1.5'
                />
              ) : null,
            )}
            {generic.map((value, i) => (
              <rect
                key={`g${i}`}
                className={`${styles.bar} ${styles.barGeneric}`}
                style={{ transitionDelay: `${i * 0.03}s` }}
                x={barX(i)}
                y={Y_BASE - value}
                width={BAR_W}
                height={value}
                rx='1.5'
              />
            ))}

            {/* plateau marker */}
            <line
              className={styles.chartMarker}
              x1={kneeX}
              x2={kneeX}
              y1={46}
              y2={Y_BASE}
            />
            <g transform={`translate(${kneeX - 62} 20)`}>
              <rect
                className={styles.chartChip}
                width='124'
                height='28'
                rx='7'
              />
              <text
                className={styles.chartChipText}
                x='62'
                y='18'
                textAnchor='middle'
              >
                GENERIC PLATEAU
              </text>
            </g>

            {/* y-axis chip */}
            <g transform='translate(0 20)'>
              <rect
                className={styles.chartChipLight}
                width='128'
                height='28'
                rx='7'
              />
              <text
                className={styles.chartChipTextDark}
                x='64'
                y='18'
                textAnchor='middle'
              >
                GAIN PER BATCH
              </text>
            </g>

            {/* legend */}
            <g transform='translate(396 20)'>
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
            <g transform='translate(512 20)'>
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

            {/* x-axis chip */}
            <g transform={`translate(${(X0 + X1) / 2 - 104} 506)`}>
              <rect
                className={styles.chartChipSoft}
                width='208'
                height='30'
                rx='8'
              />
              <text
                className={styles.chartChipTextSoft}
                x='104'
                y='19'
                textAnchor='middle'
              >
                TRAINING DATA VOLUME (SAMPLES)
              </text>
            </g>
          </svg>
          <p className={styles.chartNote}>Illustrative schematic, not measured data.</p>
        </div>
      </div>
    </section>
  );
}
