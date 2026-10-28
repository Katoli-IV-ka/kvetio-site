/* eslint-disable @next/next/no-img-element -- photo cropped to the block with object-fit */
import { CREATIVE_WORKFLOW } from '../content';
import styles from '../v2.module.css';

export function CreativeWorkflow() {
  return (
    <section
      id='creative-workflow'
      className={styles.section}
      data-tone='alt'
    >
      <div className={styles.sectionInner}>
        <div className={styles.workflow}>
          <div className={styles.workflowCopy}>
            <h2 className={`${styles.heading} ${styles.workflowHeading}`}>
              {CREATIVE_WORKFLOW.title}
            </h2>
            <p className={styles.workflowText}>{CREATIVE_WORKFLOW.text}</p>
          </div>
          <img
            className={styles.workflowPhoto}
            src={CREATIVE_WORKFLOW.image}
            alt={CREATIVE_WORKFLOW.alt}
            loading='lazy'
          />
        </div>
      </div>
    </section>
  );
}
