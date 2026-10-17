/* eslint-disable @next/next/no-img-element -- decorative illustration beside the lists */
import { PHYSICAL_AI_CAPTURE, PHYSICAL_AI_PROTOCOL } from '../content';
import styles from '../v2.module.css';
import { IndexList } from './IndexList';

export function PhysicalAI() {
  return (
    <section
      id='physical-ai'
      className={styles.section}
    >
      <div className={styles.sectionInner}>
        <div className={styles.splitLayout}>
          <div className={styles.splitContent}>
            <div className={styles.splitHead}>
              <h2 className={styles.heading}>Physical AI data capture</h2>
              <p className={styles.typesText}>
                Human demonstrations for teaching robots: hands, objects and manipulation, captured
                from the angles your model needs and delivered as synchronized, calibrated,
                documented datasets.
              </p>
            </div>
            <div className={styles.splitGroups}>
              <IndexList
                label='What we capture'
                items={PHYSICAL_AI_CAPTURE}
              />
              <IndexList
                label='How we run it'
                items={PHYSICAL_AI_PROTOCOL}
                start={PHYSICAL_AI_CAPTURE.length + 1}
              />
            </div>
          </div>
          <img
            className={styles.splitArt}
            src='/v2/photos/robot-arm.webp'
            alt=''
            loading='lazy'
          />
        </div>
      </div>
    </section>
  );
}
