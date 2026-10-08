import { FLOWER_PATH } from '../landing/geometry';

type FlowerProps = {
  size?: number | string;
  fill?: string;
  ariaLabel?: string;
};

export function Flower({ size = 22, fill = 'currentColor', ariaLabel }: FlowerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 15 15'
      fill='none'
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
      role={ariaLabel ? 'img' : undefined}
    >
      <path
        d={FLOWER_PATH}
        fill={fill}
      />
    </svg>
  );
}
