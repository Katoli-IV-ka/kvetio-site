import { FAQ } from '../content';
import styles from '../v2.module.css';

/** Questions as a native disclosure list: works without JS and with the keyboard. */
export function Faq() {
  return (
    <section
      id='faq'
      className={styles.section}
    >
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>FAQ</h2>
        </div>
        <div>
          {FAQ.map((item) => (
            <details
              key={item.question}
              className={styles.faqItem}
            >
              <summary className={styles.faqQuestion}>
                <h3>{item.question}</h3>
                <span
                  className={styles.faqIcon}
                  aria-hidden='true'
                />
              </summary>
              <p className={styles.faqAnswer}>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
