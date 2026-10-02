import Image from 'next/image';
import { BrandTile } from '@/components/ui/BrandTile';
import { Photo } from '@/components/ui/Photo';
import { linkedin } from '@/lib/content';
import { siteConfig } from '@/lib/site';
import styles from './LinkedIn.module.css';

function VerifiedIcon() {
  return (
    <svg
      className={styles.verified}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-label='Verified page'
      role='img'
    >
      <path
        d='M7.99992 1.33331C4.31992 1.33331 1.33325 4.31998 1.33325 7.99998C1.33325 11.68 4.31992 14.6666 7.99992 14.6666C11.6799 14.6666 14.6666 11.68 14.6666 7.99998C14.6666 4.31998 11.6799 1.33331 7.99992 1.33331ZM6.66659 11.3333L3.33325 7.99998L4.27325 7.05998L6.66659 9.44665L11.7266 4.38665L12.6666 5.33331L6.66659 11.3333Z'
        fill='#0A66C2'
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      className={styles.sendIcon}
      width='17'
      height='17'
      viewBox='0 0 17 17'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      focusable='false'
    >
      <path
        d='M1.77141 8.13526L12.3745 12.3744L8.13537 1.7713L5.65696 4.24264L10.2532 10.253L4.24275 5.65685L1.77141 8.13526Z'
        fill='#fff'
      />
    </svg>
  );
}

export function LinkedIn() {
  return (
    <section
      className={styles.section}
      aria-labelledby='linkedin-title'
    >
      <div className={styles.container}>
        <h2
          id='linkedin-title'
          className={styles.heading}
        >
          {linkedin.title}
        </h2>

        <article className={styles.card}>
          <div className={styles.banner}>
            <Photo
              src='/images/linkedin-banner.webp'
              sizes='448px'
            />
            <div
              className={styles.bannerShade}
              aria-hidden='true'
            />
            <p className={styles.bannerText}>
              {linkedin.banner.lead}
              <span className={styles.bannerAccent}>{linkedin.banner.accent}</span>
            </p>
          </div>

          <div className={styles.body}>
            <div className={styles.identity}>
              <div className={styles.avatar}>
                <div className={styles.avatarInner}>
                  <BrandTile className={styles.tile} />
                </div>
              </div>

              <div className={styles.actions}>
                <a
                  className={styles.follow}
                  href={siteConfig.social.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span
                    className={styles.plus}
                    aria-hidden='true'
                  >
                    +
                  </span>
                  <span className={styles.actionLabel}>{linkedin.actions.follow}</span>
                </a>
                <a
                  className={styles.message}
                  href={siteConfig.social.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <span className={styles.sendBox}>
                    <SendIcon />
                  </span>
                  <span className={styles.actionLabel}>{linkedin.actions.message}</span>
                </a>
              </div>
            </div>

            <div className={styles.about}>
              <div className={styles.nameRow}>
                <h3 className={styles.name}>{linkedin.company}</h3>
                <VerifiedIcon />
              </div>
              <p className={styles.tagline}>{linkedin.tagline}</p>
              <p className={styles.meta}>{linkedin.meta}</p>
            </div>

            <div className={styles.footer}>
              <div className={styles.person}>
                <span className={styles.personAvatar}>
                  <Image
                    src='/images/avatar-dzmitry.webp'
                    alt=''
                    width={22}
                    height={22}
                    sizes='22px'
                    className={styles.personPhoto}
                  />
                </span>
                <span className={styles.personName}>
                  {linkedin.person.name}
                  <span className={styles.personSuffix}>{linkedin.person.suffix}</span>
                </span>
              </div>
              <div className={styles.followers}>
                <span className={styles.followersCount}>{linkedin.followers.count}</span>
                <span className={styles.followersLabel}>{linkedin.followers.label}</span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
