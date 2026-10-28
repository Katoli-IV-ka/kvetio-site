import { PROCESS_STEPS } from '../content';
import styles from '../v2.module.css';

/** `white` drops the grey ground, for where the neighbouring section is grey already */
export function Process({ white = false }: { white?: boolean }) {
  return (
    <section
      id='process'
      className={white ? `${styles.process} ${styles.processWhite}` : styles.process}
    >
      <div className={styles.processInner}>
        <h2 className={styles.heading}>Our process</h2>
        <ol className={styles.timeline}>
          {PROCESS_STEPS.map((step, index) => (
            <li
              key={step.title}
              className={styles.step}
            >
              <div className={styles.stepNum}>{String(index + 1).padStart(2, '0')}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <div
                className={styles.stepDot}
                aria-hidden='true'
              />
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
