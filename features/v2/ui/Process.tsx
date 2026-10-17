import type { CSSProperties } from 'react';
import { PROCESS_STEPS } from '../content';
import styles from '../v2.module.css';

/** Gantt-style timeline: one column per step, bars stepping down, details under each step. */
export function Process() {
  return (
    <section
      id='process'
      className={styles.process}
    >
      <div className={styles.processInner}>
        <div className={styles.processHead}>
          <p className={styles.processEyebrow}>How we work</p>
          <h2 className={styles.heading}>Our process: from requirement to dataset delivery</h2>
        </div>
        <ol
          className={styles.gantt}
          style={{ '--steps': PROCESS_STEPS.length } as CSSProperties}
        >
          {PROCESS_STEPS.map((step, index) => {
            const place = {
              '--col': index + 1,
              '--span': step.span,
              '--row': index + 1,
              '--num-row': PROCESS_STEPS.length + 1,
              '--points-row': PROCESS_STEPS.length + 2,
            } as CSSProperties;
            return (
              <li
                key={step.title}
                className={styles.ganttStep}
                style={place}
              >
                <span
                  className={styles.ganttGrid}
                  aria-hidden='true'
                />
                <h3 className={styles.ganttBar}>{step.title}</h3>
                <span className={styles.ganttNum}>{String(index + 1).padStart(2, '0')}</span>
                <ul className={styles.ganttPoints}>
                  {step.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
