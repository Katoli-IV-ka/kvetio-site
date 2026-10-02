import { Photo } from '@/components/ui/Photo';
import { team } from '@/lib/content';
import styles from './Team.module.css';

export function Team() {
  return (
    <section
      className={styles.section}
      aria-labelledby='team-title'
    >
      <div className={styles.grid}>
        <div className={styles.copy}>
          <h2
            id='team-title'
            className={styles.heading}
          >
            {team.title}
          </h2>
          <p className={styles.body}>{team.body}</p>
        </div>

        <div className={styles.media}>
          <div className={styles.frame}>
            <Photo
              src='/images/team-daisy.webp'
              sizes='(min-width: 1024px) 448px, 100vw'
              tint={{ multiply: '#f2f2f2' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
