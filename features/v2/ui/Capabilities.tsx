/* eslint-disable @next/next/no-img-element -- photos cropped to the card frame with object-fit */
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
        <ol className={styles.capCards}>
          {CAPABILITIES.map((item, index) => (
            <li
              key={item.id}
              id={item.id}
              className={styles.capCard}
            >
              <article
                className={styles.card}
                data-variant={item.variant}
              >
                <img
                  className={styles.cardImage}
                  src={item.image}
                  alt=''
                  loading='lazy'
                />
                <div className={styles.cardShade} />
                <div className={styles.cardBody}>
                  <span className={styles.cardNum}>
                    {String(index + 1).padStart(2, '0')} /{' '}
                    {String(CAPABILITIES.length).padStart(2, '0')}
                  </span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <p className={styles.cardText}>{item.text}</p>
                  <ul className={styles.cardTags}>
                    {item.spec.map((row) => (
                      <li key={row.title}>{row.title}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
