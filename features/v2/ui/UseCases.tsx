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
          {USE_CASES.map((card, index) => (
            <article
              key={card.title.join(' ')}
              className={styles.card}
              data-variant={card.variant}
            >
              {card.image && (
                <img
                  className={styles.cardImage}
                  src={card.image}
                  alt=''
                  loading='lazy'
                />
              )}
              {!['light', 'paper'].includes(card.variant) && <div className={styles.cardShade} />}
              <span className={styles.cardNum}>
                {String(index + 1).padStart(2, '0')} / {String(USE_CASES.length).padStart(2, '0')}
              </span>
              <h3 className={styles.cardTitle}>
                {card.title.map((line, lineIndex) => (
                  <span key={line}>
                    {lineIndex > 0 && <br />}
                    {line}
                  </span>
                ))}
              </h3>
              {card.variant === 'dark' && <span className={styles.cardLine} />}
              <p className={styles.cardText}>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
