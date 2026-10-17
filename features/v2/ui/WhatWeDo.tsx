import { WAYS } from '../content';
import styles from '../v2.module.css';

export function WhatWeDo() {
  return (
    <section
      id='what-we-do'
      className={styles.section}
    >
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>From model requirement to production-ready dataset</h2>
          <p className={styles.sectionLead}>
            We start from what your model has to learn, not from a catalog of existing files. Then
            we choose the route that gets you that data, or combine all three.
          </p>
        </div>
        <ol className={styles.ways}>
          {WAYS.map((way, index) => (
            <li
              key={way.title}
              className={styles.way}
            >
              <span className={styles.wayNum}>{String(index + 1).padStart(2, '0')}</span>
              <h3 className={styles.wayTitle}>{way.title}</h3>
              <p className={styles.wayText}>{way.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
