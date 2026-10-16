import { PHYSICAL_AI_CAPTURE, PHYSICAL_AI_PROTOCOL } from '../content';
import styles from '../v2.module.css';

type Item = { title: string; text: string };

function Group({ label, items, start }: { label: string; items: Item[]; start: number }) {
  return (
    <div>
      <p className={styles.groupLabel}>{label}</p>
      <ol className={styles.typeList}>
        {items.map((item, index) => (
          <li
            key={item.title}
            className={styles.typeItem}
          >
            <span className={styles.typeNum}>{String(start + index).padStart(2, '0')}</span>
            <div className={styles.typeBody}>
              <div className={styles.typeHead}>
                <h3 className={styles.typeTitle}>{item.title}</h3>
                <span className={styles.typeLeader} />
              </div>
              <p className={styles.typeText}>{item.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function PhysicalAI() {
  return (
    <section
      id='physical-ai'
      className={styles.physical}
    >
      <div className={styles.physicalInner}>
        <div className={styles.physicalHead}>
          <h2 className={styles.heading}>Physical AI data capture</h2>
          <p className={styles.typesText}>
            Human demonstrations for teaching robots: hands, objects and manipulation, captured from
            the angles your model needs and delivered as synchronized, documented datasets.
          </p>
        </div>
        <div className={styles.physicalGroups}>
          <Group
            label='What we capture'
            items={PHYSICAL_AI_CAPTURE}
            start={1}
          />
          <Group
            label='How we run it'
            items={PHYSICAL_AI_PROTOCOL}
            start={PHYSICAL_AI_CAPTURE.length + 1}
          />
        </div>
      </div>
    </section>
  );
}
