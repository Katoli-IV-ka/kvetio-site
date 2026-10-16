/* eslint-disable @next/next/no-img-element -- decorative poster art behind the cards */
import { USE_CASES } from '../content';
import styles from '../v2.module.css';

export function UseCases() {
  return (
    <section
      id='use-cases'
      className={styles.cases}
    >
      <div className={styles.casesInner}>
        <h2 className={styles.heading}>What we produce</h2>
        <div className={styles.cards}>
          {USE_CASES.map((card, index) => (
            <article
              key={card.id}
              className={styles.card}
              data-variant={card.variant}
            >
              <img
                className={styles.cardImage}
                src={card.image}
                alt=''
                loading='lazy'
              />
              <div className={styles.cardShade} />
              <span className={styles.cardNum}>
                {String(index + 1).padStart(2, '0')} / {String(USE_CASES.length).padStart(2, '0')}
              </span>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
                <ul className={styles.cardTags}>
                  {card.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
