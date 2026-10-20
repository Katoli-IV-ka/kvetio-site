import { BRAND, WHY } from '../content';
import styles from '../v2.module.css';

/** which advantage carries the black numeral */
const ACCENT_INDEX = 1;

export function WhyKvet() {
  return (
    <section
      id='why'
      className={styles.section}
    >
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>Why {BRAND}</h2>
        </div>
        <ol className={styles.whyList}>
          {WHY.map((item, index) => (
            <li
              key={item.title}
              className={styles.whyItem}
              data-accent={index === ACCENT_INDEX || undefined}
            >
              <span
                className={styles.whyNum}
                aria-hidden='true'
              >
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className={styles.whyTitle}>{item.title}</h3>
              <p className={styles.whyText}>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
