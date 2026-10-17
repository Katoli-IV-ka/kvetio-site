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
          <p className={styles.sectionLead}>
            Not a marketplace, a crowdsourcing platform or a production studio: a data production
            company built around your model&apos;s requirements.
          </p>
        </div>
        <ul className={styles.compare}>
          {WHY.map((row) => (
            <li
              key={row.them}
              className={styles.compareRow}
            >
              <h3 className={styles.compareThem}>{row.them}</h3>
              <p className={styles.compareTheirs}>{row.theyDo}</p>
              <p className={styles.compareOurs}>
                <span className={styles.compareBrand}>{BRAND}</span>
                {row.weDo}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
