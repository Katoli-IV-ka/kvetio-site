import Image, { type ImageProps } from 'next/image';
import styles from './Photo.module.css';

/** Fill effects from the Figma layer, reproduced with CSS blend modes on top of the photo. */
export type PhotoTint = {
  /** White layer in "saturation" blend mode: removes colour, keeps luminosity. */
  desaturate?: boolean;
  /** Solid layer in "multiply" blend mode (a darkening grey in the design). */
  multiply?: string;
};

type PhotoProps = Omit<ImageProps, 'alt' | 'fill' | 'width' | 'height'> & {
  alt?: string;
  className?: string;
  tint?: PhotoTint;
  /** Layer opacity (Figma node opacity). */
  opacity?: number;
};

/**
 * Full-bleed photo that fills the nearest positioned ancestor.
 * Figma "crop" fills are centred crops, which is exactly `object-fit: cover`.
 * Fill effects are applied with `tint` / `opacity`; photos that were only available as rendered
 * Figma layers (hero, mission and LinkedIn banners) have their effects baked into the file instead.
 */
export function Photo({
  alt = '',
  className,
  sizes = '100vw',
  quality = 90,
  tint,
  opacity,
  ...rest
}: PhotoProps) {
  return (
    <div
      className={className ? `${styles.photo} ${className}` : styles.photo}
      style={opacity === undefined ? undefined : { opacity }}
      aria-hidden={alt === '' ? true : undefined}
    >
      <Image
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        className={styles.image}
        {...rest}
      />
      {tint?.desaturate && (
        <span
          className={`${styles.layer} ${styles.desaturate}`}
          aria-hidden='true'
        />
      )}
      {tint?.multiply && (
        <span
          className={`${styles.layer} ${styles.multiply}`}
          style={{ backgroundColor: tint.multiply }}
          aria-hidden='true'
        />
      )}
    </div>
  );
}
