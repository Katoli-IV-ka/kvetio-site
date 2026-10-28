/* eslint-disable @next/next/no-img-element -- photo cropped to the block with object-fit */
import { type CSSProperties, useEffect, useRef, useState } from 'react';

import { CREATIVE_WORKFLOW } from '../content';
import styles from '../v2.module.css';

export function CreativeWorkflow() {
  const logRef = useRef<HTMLOListElement>(null);
  const [play, setPlay] = useState(false);

  // the log plays once, when it scrolls into view
  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setPlay(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(log);
    return () => observer.disconnect();
  }, []);

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
            <p className={styles.workflowLogLabel}>{CREATIVE_WORKFLOW.logLabel}</p>
            <ol
              ref={logRef}
              className={styles.workflowLog}
              data-play={play}
            >
              {CREATIVE_WORKFLOW.steps.map((step, index) => (
                <li
                  key={step.label}
                  className={styles.workflowStep}
                  style={{ '--i': index } as CSSProperties}
                >
                  <span className={styles.workflowStepNum}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.workflowStepLabel}>{step.label}</span>
                  <span className={styles.workflowStepDetail}>{step.detail}</span>
                </li>
              ))}
            </ol>
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
