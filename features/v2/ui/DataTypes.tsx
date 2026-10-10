import { DATA_TYPES } from '../content';
import styles from '../v2.module.css';

export function DataTypes() {
  return (
    <section
      id='data-types'
      className={styles.types}
    >
      <div className={styles.typesInner}>
        <div className={styles.typesLead}>
          <h2 className={styles.heading}>Data types</h2>
          <p className={styles.typesText}>
            Photo and video are strong use cases for us, but the workflow is built around the model
            requirement: modality, domain rules, annotation schema, and delivery format.
          </p>
        </div>
        <ol className={styles.typeList}>
          {DATA_TYPES.map((item, index) => (
            <li
              key={item.title}
              className={styles.typeItem}
            >
              <span className={styles.typeNum}>{String(index + 1).padStart(2, '0')}</span>
              <div className={styles.typeBody}>
                <div className={styles.typeHead}>
                  <h3 className={styles.typeTitle}>{item.title}</h3>
                  <span className={styles.typeLeader} />
                </div>
                <p className={styles.typeText}>{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
