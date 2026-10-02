import { Photo } from '@/components/ui/Photo';
import { statements } from '@/lib/content';
import styles from './Statements.module.css';

export function Statements() {
  const { capture, anyData, rights } = statements;

  return (
    <section
      className={styles.section}
      aria-label='What we do'
    >
      <div className={styles.grid}>
        <article className={`${styles.card} ${styles.dark}`}>
          <Photo
            src='/images/statement-field.webp'
            sizes='(min-width: 1024px) 33vw, 100vw'
          />
          <div
            className={`${styles.shade} ${styles.shadeCapture}`}
            aria-hidden='true'
          />
          <p className={`${styles.eyebrow} ${styles.eyebrowDark}`}>{capture.eyebrow}</p>
          <div className={styles.middle}>
            <h2 className={`${styles.heading} ${styles.headingCapture}`}>{capture.title}</h2>
          </div>
          <span
            className={styles.rule}
            aria-hidden='true'
          />
        </article>

        <article className={`${styles.card} ${styles.light}`}>
          <Photo
            src='/images/statement-sunflower-tint.webp'
            sizes='(min-width: 1024px) 33vw, 100vw'
          />
          <div
            className={`${styles.shade} ${styles.shadePaper}`}
            aria-hidden='true'
          />
          <p className={`${styles.eyebrow} ${styles.eyebrowLight}`}>{anyData.eyebrow}</p>
          <div className={styles.middle}>
            <div className={styles.pair}>
              <h2 className={styles.primary}>{anyData.primary}</h2>
              <p className={styles.secondary}>{anyData.secondary}</p>
            </div>
          </div>
          <p className={styles.body}>{anyData.body}</p>
        </article>

        <article className={`${styles.card} ${styles.dark} ${styles.centered}`}>
          <Photo
            src='/images/statement-sunflower-mono.webp'
            sizes='(min-width: 1024px) 33vw, 100vw'
          />
          <div
            className={`${styles.shade} ${styles.shadeRights}`}
            aria-hidden='true'
          />
          <div className={styles.rights}>
            <h2 className={styles.rightsTitle}>{rights.title}</h2>
            <p className={styles.rightsBody}>{rights.body}</p>
          </div>
        </article>
      </div>
    </section>
  );
}
