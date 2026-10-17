/* eslint-disable @next/next/no-img-element -- decorative illustration beside the spec table */
import { PHYSICAL_AI_CAPTURE } from '../content';
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
            <p className={styles.groupLabel}>Capture spec</p>
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
      </div>
    </section>
  );
}
