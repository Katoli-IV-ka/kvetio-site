import { INFRASTRUCTURE } from '../content';
import styles from '../v2.module.css';

export function Infrastructure() {
  return (
    <section
      id='infrastructure'
      className={styles.section}
    >
      <div className={styles.sectionInner}>
        <div className={styles.infra}>
          <div className={styles.infraHead}>
            <h2 className={styles.heading}>Production infrastructure</h2>
            <p className={styles.sectionLead}>
              Global production, one dataset specification. We build local production and
              contributor teams around each project — across locations, countries and regions.
            </p>
          </div>
          <ol className={styles.infraList}>
            {INFRASTRUCTURE.map((item, index) => (
              <li
                key={item.title}
                className={styles.infraItem}
              >
                <span className={styles.infraNum}>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className={styles.infraTitle}>{item.title}</h3>
                  <p className={styles.infraText}>{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
