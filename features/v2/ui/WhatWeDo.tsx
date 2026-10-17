/* eslint-disable @next/next/no-img-element -- photos cropped to the card frame with object-fit */
import { WAYS } from '../content';
import styles from '../v2.module.css';

export function WhatWeDo() {
  return (
    <section
      id='what-we-do'
      className={styles.section}
    >
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>From model requirement to production-ready dataset</h2>
          <p className={styles.sectionLead}>
            We start from what your model has to learn, not from a catalog of existing files. Then
            we choose the route that gets you that data, or combine all three.
          </p>
        </div>
        <ol className={styles.routes}>
          {WAYS.map((way, index) => (
            <li key={way.title}>
              <article
                className={styles.card}
                data-variant={way.variant}
              >
                <img
                  className={styles.cardImage}
                  src={way.image}
                  alt=''
                  loading='lazy'
                />
                <div className={styles.cardShade} />
                <div className={styles.cardBody}>
                  <span className={styles.cardNum}>
                    {String(index + 1).padStart(2, '0')} / {String(WAYS.length).padStart(2, '0')}
                  </span>
                  <h3 className={styles.cardTitle}>{way.title}</h3>
                  <p className={styles.cardText}>{way.text}</p>
                  <ul className={styles.cardTags}>
                    {way.tags.map((tag) => (
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
