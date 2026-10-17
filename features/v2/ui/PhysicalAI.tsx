import { PHYSICAL_AI_CAPTURE, PHYSICAL_AI_PROTOCOL } from '../content';
import styles from '../v2.module.css';
import { IndexList } from './IndexList';

export function PhysicalAI() {
  return (
    <section
      id='physical-ai'
      className={styles.physical}
    >
      <div className={styles.physicalInner}>
        <div className={styles.physicalHead}>
          <h2 className={styles.heading}>Physical AI data capture</h2>
          <p className={styles.typesText}>
            Human demonstrations for teaching robots: hands, objects and manipulation, captured from
            the angles your model needs and delivered as synchronized, calibrated, documented
            datasets.
          </p>
        </div>
        <div className={styles.physicalGroups}>
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
    </section>
  );
}
