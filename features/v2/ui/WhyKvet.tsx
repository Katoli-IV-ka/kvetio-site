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
        <table className={styles.compareTable}>
          <thead>
            <tr>
              <th scope='col'>Alternative</th>
              <th scope='col'>How they work</th>
              <th
                scope='col'
                className={styles.compareUs}
              >
                {BRAND}
              </th>
            </tr>
          </thead>
          <tbody>
            {WHY.map((row) => (
              <tr key={row.them}>
                <th scope='row'>{row.them}</th>
                <td data-label='How they work'>{row.theyDo}</td>
                <td
                  data-label={BRAND}
                  className={styles.compareUs}
                >
                  {row.weDo}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
