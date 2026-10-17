/* eslint-disable @next/next/no-img-element -- photos cropped to the panel with object-fit */
import { useState } from 'react';
import { WAYS } from '../content';
import styles from '../v2.module.css';

/** The routes as an accordion on the left, the open route's photo on the right with a caption bar.
    Hover or click opens a route. */
export function WhatWeDo() {
  const [active, setActive] = useState(0);

  return (
    <section
      id='what-we-do'
      className={styles.section}
    >
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>What we do</h2>
          <p className={styles.sectionLead}>
            We start from what your model has to learn, not from a catalog of existing files. Then
            we choose the route that gets you that data, or combine all three.
          </p>
        </div>
        <div className={styles.flowPanel}>
          <ul className={styles.flowList}>
            {WAYS.map((way, index) => {
              const open = index === active;
              return (
                <li
                  key={way.title}
                  className={styles.flowItem}
                  data-open={open}
                  onMouseEnter={() => setActive(index)}
                >
                  <h3 className={styles.flowItemHeading}>
                    <button
                      type='button'
                      className={styles.flowItemButton}
                      aria-expanded={open}
                      aria-controls={`route-${index}`}
                      onClick={() => setActive(index)}
                      onFocus={() => setActive(index)}
                    >
                      <span className={styles.flowNum}>{String(index + 1).padStart(2, '0')}</span>
                      <span className={styles.flowName}>{way.title}</span>
                      <span
                        className={styles.flowPlus}
                        aria-hidden='true'
                      />
                    </button>
                  </h3>
                  <div
                    id={`route-${index}`}
                    className={styles.flowItemBody}
                  >
                    <p className={styles.flowItemText}>{way.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <figure className={styles.flowMedia}>
            {WAYS.map((way, index) => (
              <img
                key={way.title}
                className={styles.flowPhoto}
                data-active={index === active}
                src={way.image}
                alt=''
                loading='lazy'
              />
            ))}
            <figcaption className={styles.flowCaption}>
              <span>Route {String(active + 1).padStart(2, '0')}</span>
              <span>{WAYS[active]!.title}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
