import { PROCESS_STEPS } from '../content';
import styles from '../v2.module.css';

export function Process() {
  return (
    <section
      id='process'
      className={styles.process}
    >
      <div className={styles.processInner}>
        <h2 className={styles.heading}>
          From brief
          <br />
          to delivery
        </h2>
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
