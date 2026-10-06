import { dataTypes } from '@/lib/content';
import styles from './DataTypes.module.css';

export function DataTypes() {
  return (
    <section
      className={styles.section}
      aria-labelledby='data-types-title'
    >
      <div className={styles.grid}>
        <div className={styles.title}>
          <h2
            id='data-types-title'
            className={styles.heading}
          >
            {dataTypes.title}
          </h2>
          <span
            className={styles.rule}
            aria-hidden='true'
          >
            <span className={styles.line} />
            <span className={styles.dotAnchor}>
              <span className={styles.dot} />
            </span>
          </span>
        </div>

        <dl className={styles.list}>
          {dataTypes.items.map((item) => (
            <div
              key={item.title}
              className={styles.item}
            >
              <dt className={styles.term}>{item.title}</dt>
              <dd className={styles.description}>{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
