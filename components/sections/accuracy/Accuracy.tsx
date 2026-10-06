import { accuracy } from '@/lib/content';
import styles from './Accuracy.module.css';

export function Accuracy() {
  return (
    <section
      className={styles.section}
      aria-labelledby='accuracy-title'
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h2
            id='accuracy-title'
            className={styles.heading}
          >
            {accuracy.title}
          </h2>
          <p className={styles.body}>{accuracy.body}</p>
        </div>

        <figure className={styles.chart}>
          <svg
            className={styles.graph}
            viewBox='0 0 1024 420'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            role='img'
            aria-label='Availability of ready-made data falls while in-house simulation complexity rises from early stages to production readiness.'
          >
            <path
              d='M0 388.5H1024'
              stroke='#fff'
              strokeOpacity='0.12'
              strokeWidth='1.037'
            />
            <path
              d='M20.48 42C143.36 189 286.72 357 532.48 378C716.8 384.3 870.4 386.4 1003.52 386.4'
              stroke='url(#accuracy-blue)'
              strokeWidth='3.111'
              strokeLinecap='round'
            />
            <path
              d='M20.48 336C266.24 336 491.52 315 655.36 241.5C778.24 178.5 901.12 84 1003.52 26.25'
              stroke='url(#accuracy-amber)'
              strokeWidth='3.111'
              strokeLinecap='round'
            />
            <circle
              cx='1003.52'
              cy='386.4'
              r='4.1'
              fill='#93C5FD'
            />
            <circle
              cx='1003.52'
              cy='26.25'
              r='4.2'
              fill='#FBBF24'
            />
            <defs>
              <linearGradient
                id='accuracy-blue'
                x1='20.48'
                y1='42'
                x2='1003.52'
                y2='42'
                gradientUnits='userSpaceOnUse'
              >
                <stop stopColor='#60A5FA' />
                <stop
                  offset='1'
                  stopColor='#93C5FD'
                  stopOpacity='0.85'
                />
              </linearGradient>
              <linearGradient
                id='accuracy-amber'
                x1='20.48'
                y1='336'
                x2='927.051'
                y2='-124.343'
                gradientUnits='userSpaceOnUse'
              >
                <stop
                  stopColor='#F59E0B'
                  stopOpacity='0.7'
                />
                <stop
                  offset='1'
                  stopColor='#FBBF24'
                />
              </linearGradient>
            </defs>
          </svg>

          <ol className={styles.stages}>
            {accuracy.stages.map((stage) => (
              <li key={stage}>{stage}</li>
            ))}
          </ol>

          <ul className={styles.legend}>
            {accuracy.legend.map((entry) => (
              <li
                key={entry.label}
                className={styles.legendItem}
              >
                <span
                  className={`${styles.swatch} ${entry.tone === 'blue' ? styles.blue : styles.amber}`}
                  aria-hidden='true'
                />
                {entry.label}
              </li>
            ))}
          </ul>
        </figure>
      </div>
    </section>
  );
}
