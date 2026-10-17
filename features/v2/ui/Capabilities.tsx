/* eslint-disable @next/next/no-img-element -- art cropped to the media frame with object-fit */
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { CAPABILITIES } from '../content';
import styles from '../v2.module.css';

const COUNT = CAPABILITIES.length;
/** The pinned showcase only runs where the open panel fits beside the picture (matches the CSS) */
const PIN_QUERY = '(min-width: 1024px) and (min-height: 680px)';
/** How long one switch scrolls before the next wheel step is taken */
const STEP_MS = 700;
/** Quiet time that ends a wheel or trackpad gesture; its momentum events are swallowed until then */
const GESTURE_GAP_MS = 180;
/** Delay after any other scrolling (scrollbar, keys, touch) before settling on the nearest panel */
const SETTLE_MS = 140;

/**
 * Core capabilities, micro1-style: on desktop the section pins to the screen and one wheel gesture
 * switches to the next direction (text opens, picture cross-fades) instead of scrolling the page;
 * after the last one the page scrolls on. Any other scrolling settles on the nearest direction.
 * On phones the four directions are plain stacked panels.
 */
export function Capabilities() {
  const trackRef = useRef<HTMLDivElement>(null);
  const goRef = useRef<(index: number) => void>(() => undefined);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    const pinMedia = window.matchMedia(PIN_QUERY);
    const reduceMedia = window.matchMedia('(prefers-reduced-motion: reduce)');
    const anchors = Array.from(track.querySelectorAll<HTMLElement>('[data-anchor]'));
    const items = Array.from(track.querySelectorAll<HTMLElement>('[data-item]'));
    let current = 0;
    let locked = false;
    let entered = false;
    let lastWheel = 0;
    let releaseTimer = 0;
    let settleTimer = 0;

    const pinned = () => pinMedia.matches;
    const trackTop = () => track.getBoundingClientRect().top + window.scrollY;
    // the track is COUNT screens tall, so each direction owns one screen of scrolling
    const step = () => (track.offsetHeight - window.innerHeight) / Math.max(COUNT - 1, 1);
    const positionFor = (index: number) => trackTop() + index * step();
    const nearest = () =>
      Math.min(Math.max(Math.round((window.scrollY - trackTop()) / step()), 0), COUNT - 1);
    const inZone = () => {
      const rect = track.getBoundingClientRect();
      return rect.top <= 1 && rect.bottom >= window.innerHeight - 1;
    };
    const show = (index: number) => {
      if (index === current) return;
      current = index;
      setActive(index);
    };

    // menu and footer links land on the right direction: one screen apart when pinned,
    // at each stacked panel (below the 64px bar) on phones
    const placeAnchors = () => {
      const top = track.getBoundingClientRect().top;
      anchors.forEach((anchor, index) => {
        const offset = pinned()
          ? index * step()
          : items[index]!.getBoundingClientRect().top - top - 64;
        anchor.style.top = `${Math.max(offset, 0)}px`;
      });
    };

    const go = (index: number) => {
      if (!pinned()) return;
      locked = true;
      show(index);
      window.scrollTo({
        top: positionFor(index),
        behavior: reduceMedia.matches ? 'auto' : 'smooth',
      });
      const started = performance.now();
      const release = () => {
        const now = performance.now();
        if (now - started >= STEP_MS && now - lastWheel >= GESTURE_GAP_MS) {
          locked = false;
          return;
        }
        releaseTimer = window.setTimeout(release, 50);
      };
      window.clearTimeout(releaseTimer);
      releaseTimer = window.setTimeout(release, STEP_MS);
    };
    goRef.current = go;

    const onWheel = (event: WheelEvent) => {
      if (!pinned() || reduceMedia.matches || !inZone()) return;
      lastWheel = performance.now();
      if (locked) {
        event.preventDefault();
        return;
      }
      // the gesture that brought the section in lands on the nearest direction first
      if (!entered) {
        entered = true;
        event.preventDefault();
        go(nearest());
        return;
      }
      if (Math.abs(event.deltaY) < 4) return;
      const next = current + Math.sign(event.deltaY);
      if (next < 0 || next >= COUNT) return; // past the first or last direction the page scrolls on
      event.preventDefault();
      go(next);
    };

    const onScroll = () => {
      if (!pinned()) return;
      if (!inZone()) entered = false;
      if (!locked) show(nearest());
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (!pinned() || locked || !inZone()) return;
        const index = nearest();
        if (Math.abs(window.scrollY - positionFor(index)) > 2) go(index);
      }, SETTLE_MS);
    };

    const onResize = () => {
      placeAnchors();
      if (pinned() && inZone()) window.scrollTo({ top: positionFor(current) });
    };

    placeAnchors();
    // a link opened with #physical-ai etc. jumped before the anchors were placed
    const hashed = anchors.find((anchor) => `#${anchor.id}` === window.location.hash);
    if (hashed) {
      window.scrollTo({ top: hashed.getBoundingClientRect().top + window.scrollY });
      if (pinned()) show(anchors.indexOf(hashed));
    }

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    pinMedia.addEventListener('change', placeAnchors);
    return () => {
      window.clearTimeout(releaseTimer);
      window.clearTimeout(settleTimer);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      pinMedia.removeEventListener('change', placeAnchors);
    };
  }, []);

  return (
    <section
      id='capabilities'
      className={styles.caps}
    >
      <div
        ref={trackRef}
        className={styles.capsTrack}
        style={{ '--count': COUNT } as CSSProperties}
      >
        {CAPABILITIES.map((item) => (
          <span
            key={item.id}
            id={item.id}
            className={styles.capsAnchor}
            data-anchor
            aria-hidden='true'
          />
        ))}
        <div className={styles.capsPin}>
          <div className={styles.capsInner}>
            <div className={styles.sectionHead}>
              <h2 className={styles.heading}>Core capabilities</h2>
              <p className={styles.sectionLead}>
                Four directions where we design and produce data for training, post-training and
                evaluation.
              </p>
            </div>
            <div className={styles.capsBody}>
              <ol className={styles.capsList}>
                {CAPABILITIES.map((item, index) => {
                  const isActive = index === active;
                  return (
                    <li
                      key={item.id}
                      className={styles.capsItem}
                      data-item
                      data-active={isActive}
                    >
                      <h3 className={styles.capsHeading}>
                        <button
                          type='button'
                          className={styles.capsTitle}
                          aria-expanded={isActive}
                          aria-controls={`${item.id}-detail`}
                          onClick={() => goRef.current(index)}
                        >
                          {item.title}
                          <span
                            className={styles.capsChevron}
                            aria-hidden='true'
                          />
                        </button>
                      </h3>
                      <div
                        id={`${item.id}-detail`}
                        className={styles.capsDetail}
                      >
                        <div className={styles.capsDetailInner}>
                          <img
                            className={styles.capsInlineImage}
                            data-fit={item.fit}
                            src={item.image}
                            alt=''
                            loading='lazy'
                          />
                          <p className={styles.capsText}>{item.text}</p>
                          <dl className={styles.paiSpec}>
                            {item.spec.map((row) => (
                              <div
                                key={row.title}
                                className={styles.paiRow}
                              >
                                <dt>{row.title}</dt>
                                <dd>{row.text}</dd>
                              </div>
                            ))}
                          </dl>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
              <div
                className={styles.capsMedia}
                aria-hidden='true'
              >
                {CAPABILITIES.map((item, index) => (
                  <img
                    key={item.id}
                    className={styles.capsImage}
                    data-fit={item.fit}
                    data-active={index === active}
                    src={item.image}
                    alt=''
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
