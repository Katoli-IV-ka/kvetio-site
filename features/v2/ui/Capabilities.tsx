/* eslint-disable @next/next/no-img-element -- photos cropped to the card with object-fit */
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
            Four core areas of custom data production for training, post-training and evaluation.
          </p>
        </div>
        <ol className={styles.capCards}>
          {CAPABILITIES.map((item, index) => (
            <li
              key={item.id}
              id={item.id}
              className={styles.capCard}
              data-look={item.look}
              tabIndex={0}
            >
              {item.image && (
                <img
                  className={styles.capPhoto}
                  src={item.image}
                  alt=''
                  loading='lazy'
                />
              )}
              <span className={styles.capNum}>/{String(index + 1).padStart(2, '0')}</span>
              <div className={styles.capCopy}>
                <h3 className={styles.capTitle}>{item.title}</h3>
                <p className={styles.capText}>{item.text}</p>
                <div className={styles.capMore}>
                  <ul className={styles.capDetails}>
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
