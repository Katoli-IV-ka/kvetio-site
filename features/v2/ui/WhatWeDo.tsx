/* eslint-disable @next/next/no-img-element -- photos cropped to the panel with object-fit */
import { useState } from 'react';
import { WAYS } from '../content';
import styles from '../v2.module.css';

/** A white split panel on a dark band: the routes as an accordion on the left, the open route's
    photo on the right with a caption bar. Hover or click opens a route. */
export function WhatWeDo() {
  const [active, setActive] = useState(0);

  return (
    <section
      id='what-we-do'
      className={styles.flow}
    >
      <div className={styles.flowInner}>
        <div className={styles.flowPanel}>
          <div className={styles.flowSide}>
            <h2 className={styles.flowLabel}>What we do</h2>
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
                        {way.title}
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
            <p className={styles.flowLead}>
              We start from what your model has to learn, not from a catalog of existing files. Then
              we choose the route that gets you that data, or combine all three.
            </p>
          </div>
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
              <span>
                {WAYS[active]!.title}
                <span
                  className={styles.flowArrow}
                  aria-hidden='true'
                >
                  ↗
                </span>
              </span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
