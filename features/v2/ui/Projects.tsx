import { PROJECTS, PROJECTS_ARE_PLACEHOLDERS } from '../content';
import styles from '../v2.module.css';

export function Projects() {
  return (
    <section
      id='projects'
      className={styles.section}
    >
      <div className={styles.sectionInner}>
        <div className={styles.sectionHead}>
          <h2 className={styles.heading}>Selected projects</h2>
          <p className={styles.sectionLead}>
            Anonymized examples of datasets we have produced: the task, the setup, the scale and
            what was delivered.
          </p>
        </div>
        {PROJECTS_ARE_PLACEHOLDERS && (
          <p className={styles.draftNote}>
            Placeholder content: replace with real anonymized projects before launch.
          </p>
        )}
        <ul className={styles.projects}>
          {PROJECTS.map((project) => (
            <li
              key={project.title}
              className={styles.project}
            >
              <p className={styles.projectArea}>{project.area}</p>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <dl className={styles.projectRows}>
                {project.rows.map((row) => (
                  <div key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.text}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
