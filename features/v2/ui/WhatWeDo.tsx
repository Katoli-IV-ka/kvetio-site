/* eslint-disable @next/next/no-img-element -- thumbnails cropped with object-fit */
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { WAYS } from '../content';
import styles from '../v2.module.css';

/**
 * The heading drawn as a flow: the model requirement on the left branches into the three routes,
 * which converge into a production-ready dataset on the right. Dark, full-bleed, routes slide in
 * one after another when the block scrolls into view.
 */
export function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id='what-we-do'
      className={styles.flow}
    >
      <div
        ref={ref}
        className={styles.flowInner}
        data-visible={visible}
      >
        <div className={styles.flowHead}>
          <p className={styles.flowEyebrow}>What we do</p>
          <h2 className={styles.flowTitle}>From model requirement to production-ready dataset</h2>
          <p className={styles.flowLead}>
            We start from what your model has to learn, not from a catalog of existing files. Then
            we choose the route that gets you that data, or combine all three.
          </p>
        </div>
        <div className={styles.flowMap}>
          <div
            className={styles.flowNode}
            data-end='start'
          >
            <span className={styles.flowNodeLabel}>Input</span>
            Your model requirement
          </div>
          <ol className={styles.flowRoutes}>
            {WAYS.map((way, index) => (
              <li
                key={way.title}
                className={styles.flowRoute}
                style={{ '--i': index } as CSSProperties}
              >
                <span className={styles.flowNum}>{String(index + 1).padStart(2, '0')}</span>
                <div className={styles.flowCopy}>
                  <h3 className={styles.flowRouteTitle}>{way.title}</h3>
                  <p className={styles.flowText}>{way.text}</p>
                  <p className={styles.flowTags}>{way.tags.join(' · ')}</p>
                </div>
                <img
                  className={styles.flowThumb}
                  src={way.image}
                  alt=''
                  loading='lazy'
                />
              </li>
            ))}
          </ol>
          <div
            className={styles.flowNode}
            data-end='finish'
          >
            <span className={styles.flowNodeLabel}>Output</span>
            Production-ready dataset
          </div>
        </div>
      </div>
    </section>
  );
}
