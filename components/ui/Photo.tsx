import Image, { type ImageProps } from 'next/image';
import styles from './Photo.module.css';

type PhotoProps = Omit<ImageProps, 'alt' | 'fill' | 'width' | 'height'> & {
  alt?: string;
  className?: string;
};

/**
 * Full-bleed photo that fills the nearest positioned ancestor.
 * Figma "crop" fills are centred crops, which is exactly `object-fit: cover`.
 * Tints from the design (multiply / saturation / opacity) are baked into the exported files.
 */
export function Photo({ alt = '', className, sizes = '100vw', quality = 90, ...rest }: PhotoProps) {
  return (
    <div
      className={className ? `${styles.photo} ${className}` : styles.photo}
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
    </div>
  );
}
