import styles from '../v2.module.css';

type Item = { title: string; text: string };

/** Numbered index list with dashed leaders; `start` continues the numbering across groups. */
export function IndexList({
  label,
  items,
  start = 1,
}: {
  label?: string;
  items: Item[];
  start?: number;
}) {
  return (
    <div>
      {label && <p className={styles.groupLabel}>{label}</p>}
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
