/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import type { CSSProperties } from 'react';
import { CITIES, INFRASTRUCTURE } from '../content';
import styles from '../v2.module.css';

const MAP_PX = 640;
const IMG_PX = 1024;
const toCqw = (px: number) => `${(px / MAP_PX) * 100}cqw`;

export function Infrastructure() {
  return (
    <section
      id='infrastructure'
      className={styles.framed}
    >
      <div className={styles.framedInner}>
        <div className={styles.infra}>
          <div className={styles.sectionHead}>
            <h2 className={styles.heading}>Production infrastructure</h2>
            <p className={styles.sectionLead}>
              Global production, one dataset specification. We build local production and
              contributor teams around each project — across locations, countries and regions.
            </p>
          </div>
          <div className={styles.infraGrid}>
            <div className={styles.mapWrap}>
              <div className={styles.map}>
                <img
                  className={styles.globe}
                  src='/v2/world-globe.webp'
                  alt=''
                />
                {CITIES.map((city) => {
                  const up = city.dir === 'up';
                  const pinStyle: CSSProperties = {
                    left: `${(city.x / IMG_PX) * 100}%`,
                    top: `${(city.y / IMG_PX) * 100}%`,
                  };
                  const stickStyle: CSSProperties = {
                    height: toCqw(city.len),
                    [up ? 'bottom' : 'top']: 0,
                  };
                  const plateStyle: CSSProperties = up
                    ? { bottom: `calc(${toCqw(city.len)} - 1px)` }
                    : { top: `calc(${toCqw(city.len)} - 1px)` };
                  return (
                    <div
                      key={city.name}
                      className={styles.pin}
                      style={pinStyle}
                    >
                      <span
                        className={styles.pinStick}
                        style={stickStyle}
                      />
                      <span
                        className={styles.pinPlate}
                        style={plateStyle}
                      >
                        {city.name}
                      </span>
                      <span className={styles.pinDot} />
                    </div>
                  );
                })}
              </div>
            </div>
            <ol className={styles.infraList}>
              {INFRASTRUCTURE.map((item, index) => (
                <li
                  key={item.title}
                  className={styles.infraItem}
                >
                  <span className={styles.infraNum}>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className={styles.infraTitle}>{item.title}</h3>
                    <p className={styles.infraText}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
