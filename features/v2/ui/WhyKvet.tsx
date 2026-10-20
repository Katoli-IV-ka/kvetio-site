import { BRAND, WHY } from '../content';
import styles from '../v2.module.css';

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
        <ul className={`${styles.ways} ${styles.whyGrid}`}>
          {WHY.map((item) => (
            <li
              key={item.title}
              className={styles.way}
            >
              <h3 className={styles.wayTitle}>{item.title}</h3>
              <p className={styles.wayText}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
