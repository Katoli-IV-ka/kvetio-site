/* eslint-disable @next/next/no-img-element -- small decorative images inside the profile card */
import { linkedinCopy } from '../../../shared/landing/site-content';
import styles from '../v2.module.css';

/** Company page teaser in the shape of a LinkedIn profile card; every action opens the page. */
export function LinkedIn() {
  return (
    <section
      id='linkedin'
      className={styles.section}
      data-tone='alt'
    >
      <div className={styles.sectionInner}>
        <div className={styles.liLayout}>
          <div className={styles.liLead}>
            <h2 className={styles.heading}>{linkedinCopy.title}</h2>
            <p className={styles.sectionLead}>
              Follow Kvet for new datasets, projects and notes from production.
            </p>
          </div>
          <article className={styles.liCard}>
            <div className={styles.liBanner}>
              <img
                src='/images/v2/li-banner.jpg'
                alt=''
                loading='lazy'
              />
              <p>
                {linkedinCopy.banner} {linkedinCopy.bannerAccent}
              </p>
            </div>
            <div className={styles.liBody}>
              <div className={styles.liTop}>
                <span className={styles.liLogo}>
                  <img
                    src='/v2/kvetio-mark-black.png'
                    alt=''
                    width={44}
                    height={44}
                  />
                </span>
                <div className={styles.liActions}>
                  <a
                    className={styles.liFollow}
                    href={linkedinCopy.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    + Follow
                  </a>
                  <a
                    className={styles.liMessage}
                    href={linkedinCopy.url}
                    target='_blank'
                    rel='noreferrer'
                  >
                    Message
                  </a>
                </div>
              </div>
              <h3 className={styles.liName}>
                {linkedinCopy.name}
                <svg
                  className={styles.liVerified}
                  viewBox='0 0 16 16'
                  aria-label='Verified'
                  role='img'
                >
                  <circle
                    cx='8'
                    cy='8'
                    r='8'
                  />
                  <path d='M4.6 8.2l2.2 2.2 4.6-4.6' />
                </svg>
              </h3>
              <p className={styles.liTagline}>{linkedinCopy.tagline}</p>
              <p className={styles.liMeta}>{linkedinCopy.meta}</p>
              <div className={styles.liFoot}>
                <img
                  src='/images/v2/li-avatar.jpg'
                  alt=''
                  width={24}
                  height={24}
                />
                <span>
                  <strong>{linkedinCopy.person}</strong> works here
                </span>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
