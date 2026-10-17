import { CAPABILITIES } from '../content';
import styles from '../v2.module.css';

export function Capabilities() {
  return (
    <section
      id='capabilities'
      className={styles.section}
      data-tone='alt'
    >
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>Core capabilities</h2>
          <p className={styles.sectionLead}>
            Four directions where we design and produce data for training, post-training and
            evaluation.
          </p>
        </div>
        <ol className={`${styles.ways} ${styles.waysFour}`}>
          {CAPABILITIES.map((card) => (
            <li
              key={card.id}
              className={styles.way}
            >
              <h3 className={styles.wayTitle}>{card.title}</h3>
              <p className={styles.wayText}>{card.text}</p>
              <ul className={styles.wayTags}>
                {card.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
