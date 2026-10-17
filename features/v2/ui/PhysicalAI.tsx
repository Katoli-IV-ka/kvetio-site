/* eslint-disable @next/next/no-img-element -- decorative illustration beside the spec table */
import { PHYSICAL_AI_CAPTURE, PHYSICAL_AI_PROTOCOL } from '../content';
import styles from '../v2.module.css';

export function PhysicalAI() {
  return (
    <section
      id='physical-ai'
      className={styles.section}
    >
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>Physical AI data capture</h2>
          <p className={styles.sectionLead}>
            Human demonstrations for teaching robots, delivered as synchronized, calibrated,
            documented datasets.
          </p>
        </div>
        <div className={styles.paiMain}>
          <img
            className={styles.paiArt}
            src='/v2/photos/robot-arm.webp'
            alt=''
            loading='lazy'
          />
          <div>
            <p className={styles.groupLabel}>What we capture</p>
            <dl className={styles.paiSpec}>
              {PHYSICAL_AI_CAPTURE.map((item) => (
                <div
                  key={item.title}
                  className={styles.paiRow}
                >
                  <dt>{item.title}</dt>
                  <dd>{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div>
          <p className={styles.groupLabel}>How we run it</p>
          <ol className={styles.paiSteps}>
            {PHYSICAL_AI_PROTOCOL.map((step, index) => (
              <li
                key={step.title}
                className={styles.paiStep}
              >
                <span className={styles.paiNum}>{String(index + 1).padStart(2, '0')}</span>
                <h3 className={styles.paiTitle}>{step.title}</h3>
                <p className={styles.paiText}>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
