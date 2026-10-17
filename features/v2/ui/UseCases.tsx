/* eslint-disable @next/next/no-img-element -- decorative poster art behind the cards */
import { useEffect, useRef } from 'react';
import { USE_CASES } from '../content';
import styles from '../v2.module.css';

/** How many cards may sit under the top one before the lowest fades out */
const MAX_DEPTH = 2;

export function UseCases() {
  const listRef = useRef<HTMLOListElement>(null);

  // Deck effect: each card sticks under the header; while the next one slides up over it,
  // the cards beneath shrink, lift and darken, so their top edges peek out above the stack
  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;
    const items = Array.from(list.children) as HTMLElement[];
    let frame = 0;

    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      const stackTop = parseFloat(getComputedStyle(items[0]!).top) || 0;
      const range = Math.max(viewport - stackTop, 1);
      const progress = items.map((item) => {
        const top = item.getBoundingClientRect().top;
        return Math.min(Math.max((viewport - top) / range, 0), 1);
      });
      items.forEach((item, index) => {
        const depth = progress.slice(index + 1).reduce((sum, p) => sum + p, 0);
        item.style.setProperty('--depth', Math.min(depth, MAX_DEPTH + 1).toFixed(3));
      });
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <section
      id='use-cases'
      className={styles.cases}
    >
      <div className={styles.casesInner}>
        <h2 className={styles.heading}>What we produce</h2>
        <ol
          ref={listRef}
          className={styles.stack}
        >
          {USE_CASES.map((card, index) => (
            <li
              key={card.id}
              className={styles.stackItem}
            >
              <article
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
                <div className={styles.cardBody}>
                  <span className={styles.cardNum}>
                    {String(index + 1).padStart(2, '0')} /{' '}
                    {String(USE_CASES.length).padStart(2, '0')}
                  </span>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  <p className={styles.cardText}>{card.text}</p>
                  <ul className={styles.cardTags}>
                    {card.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
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
