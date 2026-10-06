import { Photo } from '@/components/ui/Photo';
import { mission } from '@/lib/content';
import styles from './Mission.module.css';

export function Mission() {
  return (
    <section
      className={styles.section}
      aria-label='Mission'
    >
      <div className={styles.frame}>
        <Photo
          src='/images/mission-meadow.webp'
          sizes='100vw'
        />
        <div
          className={styles.shade}
          aria-hidden='true'
        />
        <h2 className={styles.heading}>{mission.title}</h2>
      </div>
    </section>
  );
}
