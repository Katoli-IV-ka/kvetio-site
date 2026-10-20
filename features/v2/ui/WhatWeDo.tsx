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
          <h2 className={styles.heading}>What we do</h2>
          <p className={styles.sectionLead}>
            Every project starts with a specific data requirement. We build the right production and
            collection approach around it.
          </p>
        </div>
        <ul className={styles.ways}>
          {WAYS.map((way) => (
            <li
              key={way.title}
              className={styles.way}
            >
              <h3 className={styles.wayTitle}>{way.title}</h3>
              <p className={styles.wayText}>{way.text}</p>
              <ul className={styles.wayTags}>
                {way.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
