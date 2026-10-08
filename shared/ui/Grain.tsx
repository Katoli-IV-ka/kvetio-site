import { useId } from 'react';

type GrainProps = { opacity?: number };

/** Film-grain overlay: an SVG noise filter blended over the parent (parent must be positioned). */
export function Grain({ opacity = 0.5 }: GrainProps) {
  const id = `grain-${useId().replace(/:/g, '')}`;
  return (
    <svg
      aria-hidden='true'
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        mixBlendMode: 'overlay',
        opacity,
      }}
    >
      <filter
        id={id}
        x='0'
        y='0'
        width='100%'
        height='100%'
      >
        <feTurbulence
          type='fractalNoise'
          baseFrequency='0.85'
          numOctaves='2'
          stitchTiles='stitch'
        />
        <feColorMatrix
          type='saturate'
          values='0'
        />
      </filter>
      <rect
        width='100%'
        height='100%'
        filter={`url(#${id})`}
      />
    </svg>
  );
}
