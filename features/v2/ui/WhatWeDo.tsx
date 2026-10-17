/* eslint-disable @next/next/no-img-element -- thumbnails cropped with object-fit */
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { WAYS } from '../content';
import styles from '../v2.module.css';

/** Dark full-bleed band: heading and lead, then the three routes as columns that slide in one
    after another when the band scrolls into view. */
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
          <h2 className={styles.flowTitle}>What we do</h2>
          <p className={styles.flowLead}>
            We start from what your model has to learn, not from a catalog of existing files. Then
            we choose the route that gets you that data, or combine all three.
          </p>
        </div>
        <ol className={styles.flowCols}>
          {WAYS.map((way, index) => (
            <li
              key={way.title}
              className={styles.flowCol}
              style={{ '--i': index } as CSSProperties}
            >
              <img
                className={styles.flowThumb}
                src={way.image}
                alt=''
                loading='lazy'
              />
              <span className={styles.flowNum}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.flowRouteTitle}>{way.title}</h3>
              <p className={styles.flowText}>{way.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
