/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import { USE_CASES } from '../content';
import styles from '../v2.module.css';

export function UseCases() {
  return (
    <section
      id='use-cases'
      className={styles.cases}
    >
      <h2 className={`${styles.heading} ${styles.casesTitle}`}>
        Built for your
        <br />
        edge case
      </h2>
      <div
        className={styles.scroller}
        tabIndex={0}
        aria-label='Use cases, scroll horizontally'
      >
        <div className={styles.track}>
          {USE_CASES.map((card) => (
            <article
              key={card.title.join(' ')}
              className={styles.card}
            >
              <img
                className={styles.cardImage}
                src={card.image}
                alt=''
                loading='lazy'
                style={card.crop}
              />
              <div className={styles.cardShade} />
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>
                  {card.title.map((line, index) => (
                    <span key={line}>
                      {index > 0 && <br />}
                      {line}
                    </span>
                  ))}
                </h3>
                <p className={styles.cardText}>{card.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
