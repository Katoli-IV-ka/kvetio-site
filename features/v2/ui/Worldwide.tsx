/* eslint-disable @next/next/no-img-element -- decorative art positioned with exact crops */
import type { CSSProperties } from 'react';
import { CITIES } from '../content';
import styles from '../v2.module.css';

const MAP_PX = 640;
const IMG_PX = 1024;
const toCqw = (px: number) => `${(px / MAP_PX) * 100}cqw`;

export function Worldwide() {
  return (
    <section
      id='worldwide'
      className={styles.world}
    >
      <div className={styles.worldInner}>
        <div className={styles.worldLead}>
          <h2 className={styles.heading}>
            We work
            <br />
            worldwide
          </h2>
          <p className={styles.worldText}>
            Our teams shoot and collect on location across the Americas, Europe and Africa, wherever
            your model needs its data. One brief, one contract, local crews in every city.
          </p>
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
