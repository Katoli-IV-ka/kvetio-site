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
            Real-world, visual and multimodal datasets built around specific model and research
            requirements.
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
              {pattern.flow && (
                <ol className={styles.patternFlow}>
                  {pattern.flow.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              )}
              <p className={styles.patternSpec}>
                {pattern.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
