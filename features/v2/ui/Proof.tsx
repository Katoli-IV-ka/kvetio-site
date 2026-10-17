import { RIGHTS_READY, STATS } from '../content';
import styles from '../v2.module.css';
import { IndexList } from './IndexList';

const hasPlaceholders = STATS.some((stat) => stat.value.includes('['));

export function Proof() {
  return (
    <section
      id='scale'
      className={styles.section}
      data-tone='alt'
    >
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>Scale & proof</h2>
          <p className={styles.sectionLead}>
            Multi-country production, repeatable workflows and rights-ready delivery, from research
            pilots to global production at scale.
          </p>
        </div>
        {hasPlaceholders && (
          <p className={styles.draftNote}>
            Placeholder figures: replace with real numbers before launch.
          </p>
        )}
        <ul className={styles.stats}>
          {STATS.map((stat) => (
            <li
              key={stat.label}
              className={styles.stat}
            >
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </li>
          ))}
        </ul>
        <div className={styles.proofRights}>
          <IndexList
            label='Rights-ready delivery'
            items={RIGHTS_READY}
          />
        </div>
      </div>
    </section>
  );
}
