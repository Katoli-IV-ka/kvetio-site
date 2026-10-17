/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import type { CSSProperties } from 'react';
import { CITIES, INFRASTRUCTURE } from '../content';
import styles from '../v2.module.css';
import { IndexList } from './IndexList';

const MAP_PX = 640;
const IMG_PX = 1024;
const toCqw = (px: number) => `${(px / MAP_PX) * 100}cqw`;

export function Infrastructure() {
  return (
    <section
      id='infrastructure'
      className={styles.world}
    >
      <div className={styles.worldInner}>
        <div className={styles.worldLead}>
          <div className={styles.worldHead}>
            <h2 className={styles.heading}>Production infrastructure</h2>
            <p className={styles.worldText}>
              Global production, one dataset specification. We build local production and
              contributor teams around each project — across locations, countries and regions.
            </p>
          </div>
          <IndexList items={INFRASTRUCTURE} />
        </div>
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
      </div>
    </section>
  );
}
