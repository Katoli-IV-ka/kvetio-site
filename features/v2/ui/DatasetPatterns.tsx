import { DATASET_PATTERNS } from '../content';
import styles from '../v2.module.css';

export function DatasetPatterns() {
  return (
    <section
      id='datasets'
      className={styles.section}
      data-tone='alt'
    >
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>Data we produce</h2>
          <p className={styles.sectionLead}>
            Typical dataset patterns we design and produce. Every project starts from your spec, so
            these are starting points, not a catalog.
          </p>
        </div>
        <ul className={styles.patterns}>
          {DATASET_PATTERNS.map((pattern) => (
            <li
              key={pattern.title}
              className={styles.pattern}
            >
              <h3 className={styles.patternTitle}>{pattern.title}</h3>
              <p className={styles.patternText}>{pattern.text}</p>
              <p className={styles.patternSpec}>{pattern.spec}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
