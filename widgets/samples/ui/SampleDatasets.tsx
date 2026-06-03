'use client';

import { useState } from 'react';
import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { ContactModal } from '../../../features/contact/ui/ContactModal';
import { keyframes } from '@emotion/react';
import { sampleDatasets } from '../../../shared/landing/content';
import {
  brandCyan,
  brandMint,
  brandPrimary,
  brandSecondary,
  glassBorder,
  mutedText,
  softText,
} from '../../../shared/theme/colors';
import { FadeUp } from '../../../shared/ui/FadeUp';
import { GlassPanel } from '../../../shared/ui/GlassPanel';
import { SectionHeading } from '../../../shared/ui/SectionHeading';

const colors = [brandCyan, brandSecondary, brandMint, brandPrimary];

type SampleVisualName = (typeof sampleDatasets)[number]['visual'];

type DatasetPreviewProps = {
  color: string;
  visual: SampleVisualName;
};

const previewBg =
  'radial-gradient(circle at 76% 22%, rgba(255,255,255,0.12), transparent 30%), rgba(5,2,13,0.58)';

const framePulse = keyframes`
  0%, 100% { opacity: 0.72; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(-4px); }
`;

const frameScan = keyframes`
  0% { transform: translateX(-140%); opacity: 0; }
  18% { opacity: 0.7; }
  82% { opacity: 0.7; }
  100% { transform: translateX(520%); opacity: 0; }
`;

const timelineFlow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

const dashTrace = keyframes`
  0% { stroke-dashoffset: 72; opacity: 0.62; }
  50% { opacity: 1; }
  100% { stroke-dashoffset: 0; opacity: 0.62; }
`;

const chipPulse = keyframes`
  0%, 100% { opacity: 0.68; transform: translateX(0); }
  50% { opacity: 1; transform: translateX(-3px); }
`;

const audioBar = keyframes`
  0%, 100% { transform: scaleY(0.62); opacity: 0.72; }
  50% { transform: scaleY(1); opacity: 1; }
`;

const nodePulse = keyframes`
  0%, 100% { opacity: 0.66; transform: scale(0.92); }
  50% { opacity: 1; transform: scale(1.18); }
`;

const cubePivot = keyframes`
  0%, 100% { transform: scale(1) skewX(0deg); }
  33% { transform: scale(1.04) skewX(2deg); }
  66% { transform: scale(0.97) skewX(-1.5deg); }
`;

const cubeFaceGlow = keyframes`
  0%, 100% { opacity: 0.62; }
  50% { opacity: 1; }
`;

function ActionVideoVisual({ color }: { color: string }) {
  return (
    <>
      <Grid
        templateColumns='repeat(4, 1fr)'
        gap={2}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Box
            key={index}
            h='112px'
            borderRadius='16px'
            borderWidth='1px'
            borderColor='rgba(255,255,255,0.16)'
            bg={`linear-gradient(140deg, rgba(255,255,255,0.11), ${color}24)`}
            position='relative'
            overflow='hidden'
            animation={`${framePulse} 3.2s ease-in-out infinite`}
            animationDelay={`${index * 0.18}s`}
          >
            <Box
              position='absolute'
              top={0}
              bottom={0}
              left={0}
              w='18%'
              bg={`linear-gradient(90deg, transparent, ${color}66, transparent)`}
              filter='blur(2px)'
              animation={`${frameScan} 3.4s linear infinite`}
              animationDelay={`${index * 0.28}s`}
            />
            <Box
              position='absolute'
              left='26%'
              top={`${22 + index * 4}%`}
              w='42%'
              h='54%'
              borderWidth='1px'
              borderColor={color}
              boxShadow={`0 0 18px ${color}66`}
            />
            <svg
              viewBox='0 0 64 88'
              style={{
                position: 'absolute',
                inset: '12px',
                width: 'calc(100% - 24px)',
                height: 'calc(100% - 24px)',
                color,
                filter: `drop-shadow(0 0 8px ${color})`,
              }}
            >
              <circle
                cx={32 + index}
                cy='20'
                r='5'
                fill='currentColor'
              />
              <path
                d={`M${32 + index} 26 L${28 + index} 48 L20 66 M${28 + index} 48 L43 65 M${
                  30 + index
                } 34 L18 42 M${31 + index} 34 L47 42`}
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeWidth='3'
              />
            </svg>
          </Box>
        ))}
      </Grid>
      <Box
        position='absolute'
        left={5}
        right={5}
        bottom={4}
        h='4px'
        borderRadius='full'
        bg={`linear-gradient(90deg, ${color}, ${brandSecondary}, transparent, ${color})`}
        bgSize='200% 100%'
        boxShadow={`0 0 18px ${color}88`}
        animation={`${timelineFlow} 2.8s linear infinite`}
      />
    </>
  );
}

function ObjectImagesVisual({ color }: { color: string }) {
  return (
    <>
      <Box
        position='absolute'
        left={4}
        top={4}
        w='54%'
        h='118px'
        borderRadius='22px'
        borderWidth='1px'
        borderColor='rgba(255,255,255,0.16)'
        bg={`radial-gradient(circle at 62% 34%, ${color}28, transparent 42%), rgba(255,255,255,0.055)`}
        overflow='hidden'
      >
        <svg
          viewBox='0 0 260 160'
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            color,
            filter: `drop-shadow(0 0 10px ${color})`,
          }}
        >
          <rect
            x='62'
            y='28'
            width='142'
            height='114'
            rx='10'
            fill='none'
            stroke='currentColor'
            strokeDasharray='8 7'
            strokeWidth='2'
            style={{
              animation: `${dashTrace} 2.8s linear infinite`,
            }}
          />
          <line
            x1='72'
            y1='36'
            x2='72'
            y2='134'
            stroke='currentColor'
            strokeOpacity='0.64'
            strokeWidth='2'
          >
            <animate
              attributeName='x1'
              values='72;196;72'
              dur='3.2s'
              repeatCount='indefinite'
              calcMode='spline'
              keyTimes='0;0.5;1'
              keySplines='0.42 0 0.58 1;0.42 0 0.58 1'
            />
            <animate
              attributeName='x2'
              values='72;196;72'
              dur='3.2s'
              repeatCount='indefinite'
              calcMode='spline'
              keyTimes='0;0.5;1'
              keySplines='0.42 0 0.58 1;0.42 0 0.58 1'
            />
            <animate
              attributeName='opacity'
              values='0.24;0.72;0.72;0.24'
              keyTimes='0;0.18;0.82;1'
              dur='3.2s'
              repeatCount='indefinite'
            />
          </line>
          <g
            style={{
              animation: `${cubePivot} 4.6s ease-in-out infinite`,
              transformBox: 'fill-box',
              transformOrigin: 'center',
            }}
          >
            <path
              d='M132 38 L174 62 L132 86 L90 62 Z'
              fill='currentColor'
              stroke='currentColor'
              strokeWidth='2'
              style={{
                animation: `${cubeFaceGlow} 3.8s ease-in-out infinite`,
              }}
            />
            <path
              d='M90 62 L132 86 L132 132 L90 108 Z'
              fill='currentColor'
              fillOpacity='0.08'
              stroke='currentColor'
              strokeWidth='2'
              style={{
                animation: `${cubeFaceGlow} 3.8s ease-in-out infinite`,
                animationDelay: '-1.1s',
              }}
            />
            <path
              d='M174 62 L132 86 L132 132 L174 108 Z'
              fill='currentColor'
              fillOpacity='0.12'
              stroke='currentColor'
              strokeWidth='2'
              style={{
                animation: `${cubeFaceGlow} 3.8s ease-in-out infinite`,
                animationDelay: '-2s',
              }}
            />
            <path
              d='M90 62 L132 86 L174 62 M132 86 V132'
              fill='none'
              stroke='currentColor'
              strokeOpacity='0.78'
              strokeWidth='2'
            />
          </g>
          <circle
            cx='199'
            cy='35'
            r='5'
            fill='currentColor'
            style={{
              animation: `${nodePulse} 2.4s ease-in-out infinite`,
              transformBox: 'fill-box',
              transformOrigin: 'center',
            }}
          />
        </svg>
      </Box>

      <Stack
        position='absolute'
        right={4}
        top={4}
        gap={2}
        w='36%'
      >
        {[
          ['class', 'bottle'],
          ['bbox', '0.94'],
          ['scene', 'shelf'],
        ].map(([label, value], index) => (
          <Grid
            key={label}
            templateColumns='1fr auto'
            gap={2}
            alignItems='center'
            px={3}
            py={2}
            borderRadius='14px'
            borderWidth='1px'
            borderColor='rgba(255,255,255,0.14)'
            bg='rgba(0,0,0,0.3)'
            animation={`${chipPulse} 3s ease-in-out infinite`}
            animationDelay={`${index * 0.22}s`}
          >
            <Text
              color={mutedText}
              fontSize='10px'
              fontWeight='700'
            >
              {label}
            </Text>
            <Text
              color='whiteAlpha.900'
              fontSize='11px'
              fontWeight='800'
            >
              {value}
            </Text>
          </Grid>
        ))}
      </Stack>
    </>
  );
}

function AudioEventsVisual({ color }: { color: string }) {
  const bars = [30, 58, 42, 76, 52, 92, 38, 68, 48, 82, 34, 60];
  const wavePath =
    'M0 44 C42 10 70 76 110 42 S180 12 224 45 292 74 334 42 404 8 448 43 492 72 520 40';

  return (
    <>
      <Grid
        templateColumns='repeat(12, 1fr)'
        alignItems='end'
        gap={2}
        h='104px'
        px={2}
      >
        {bars.map((height, index) => (
          <Box
            key={`${height}-${index}`}
            h={`${height}px`}
            borderRadius='full'
            bg={`linear-gradient(180deg, ${color}, rgba(255,255,255,0.08))`}
            boxShadow={`0 0 16px ${color}66`}
            transformOrigin='bottom'
            animation={`${audioBar} ${1.35 + (index % 4) * 0.18}s ease-in-out infinite`}
            animationDelay={`${index * 0.08}s`}
          />
        ))}
      </Grid>
      <svg
        viewBox='0 0 520 84'
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: '16px',
          width: '100%',
          height: '46px',
          color,
          overflow: 'visible',
        }}
      >
        <defs>
          <filter
            id='snake-glow'
            x='-30%'
            y='-120%'
            width='160%'
            height='340%'
          >
            <feGaussianBlur stdDeviation='5' />
          </filter>
        </defs>

        {/* Ghost track */}
        <path
          d={wavePath}
          fill='none'
          stroke='currentColor'
          strokeOpacity='0.14'
          strokeWidth='2'
        />

        {/* Glow aura — 180 units, head at -30+930t */}
        <path
          d={wavePath}
          fill='none'
          stroke='currentColor'
          strokeOpacity='0.32'
          strokeWidth='14'
          strokeLinecap='round'
          strokeDasharray='180 1000'
          filter='url(#snake-glow)'
        >
          <animate
            attributeName='stroke-dashoffset'
            from='210'
            to='-720'
            dur='3.8s'
            repeatCount='indefinite'
          />
        </path>

        {/* Body — 80 units, same head position */}
        <path
          d={wavePath}
          fill='none'
          stroke='currentColor'
          strokeOpacity='0.78'
          strokeWidth='3.5'
          strokeLinecap='round'
          strokeDasharray='80 1000'
        >
          <animate
            attributeName='stroke-dashoffset'
            from='110'
            to='-820'
            dur='3.8s'
            repeatCount='indefinite'
          />
        </path>

        {/* Head dot — 20 units, same head position */}
        <path
          d={wavePath}
          fill='none'
          stroke='currentColor'
          strokeOpacity='1'
          strokeWidth='5'
          strokeLinecap='round'
          strokeDasharray='20 1000'
        >
          <animate
            attributeName='stroke-dashoffset'
            from='50'
            to='-880'
            dur='3.8s'
            repeatCount='indefinite'
          />
        </path>
      </svg>
    </>
  );
}

function DomainDatasetVisual({ color }: { color: string }) {
  const graphDuration = '5.8s';
  const graphKeyTimes = '0;0.34;0.68;1';
  const graphSpline = '0.42 0 0.2 1;0.42 0 0.2 1;0.42 0 0.2 1';
  const graphNodes = [
    { x: '86;108;92;86', y: '82;66;98;82' },
    { x: '180;162;196;180', y: '36;50;34;36' },
    { x: '282;304;270;282', y: '78;68;92;78' },
    { x: '394;374;416;394', y: '38;52;46;38' },
    { x: '234;214;250;234', y: '132;118;136;132' },
    { x: '426;446;408;426', y: '124;112;134;124' },
  ];
  const graphEdges: Array<[number, number]> = [
    [0, 1],
    [1, 2],
    [2, 3],
    [1, 4],
    [2, 4],
    [2, 5],
  ];

  const initialValue = (values: string) => values.split(';')[0];

  return (
    <>
      <svg
        viewBox='0 0 520 170'
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          color,
          filter: `drop-shadow(0 0 9px ${color})`,
        }}
      >
        {graphEdges.map(([fromIndex, toIndex], index) => {
          const from = graphNodes[fromIndex]!;
          const to = graphNodes[toIndex]!;

          return (
            <line
              key={`${fromIndex}-${toIndex}`}
              x1={initialValue(from.x)}
              y1={initialValue(from.y)}
              x2={initialValue(to.x)}
              y2={initialValue(to.y)}
              stroke='currentColor'
              strokeOpacity={index % 2 === 0 ? '0.72' : '0.52'}
              strokeWidth='2'
              strokeLinecap='round'
            >
              <animate
                attributeName='x1'
                values={from.x}
                dur={graphDuration}
                repeatCount='indefinite'
                keyTimes={graphKeyTimes}
                calcMode='spline'
                keySplines={graphSpline}
              />
              <animate
                attributeName='y1'
                values={from.y}
                dur={graphDuration}
                repeatCount='indefinite'
                keyTimes={graphKeyTimes}
                calcMode='spline'
                keySplines={graphSpline}
              />
              <animate
                attributeName='x2'
                values={to.x}
                dur={graphDuration}
                repeatCount='indefinite'
                keyTimes={graphKeyTimes}
                calcMode='spline'
                keySplines={graphSpline}
              />
              <animate
                attributeName='y2'
                values={to.y}
                dur={graphDuration}
                repeatCount='indefinite'
                keyTimes={graphKeyTimes}
                calcMode='spline'
                keySplines={graphSpline}
              />
              <animate
                attributeName='opacity'
                values='0.45;0.92;0.62;0.45'
                dur={graphDuration}
                begin={`${index * 0.16}s`}
                repeatCount='indefinite'
              />
            </line>
          );
        })}

        {graphNodes.map((node, index) => (
          <g key={`${node.x}-${node.y}`}>
            <circle
              cx={initialValue(node.x)}
              cy={initialValue(node.y)}
              r='15'
              fill='none'
              stroke='currentColor'
              strokeOpacity='0.18'
            >
              <animate
                attributeName='cx'
                values={node.x}
                dur={graphDuration}
                repeatCount='indefinite'
                keyTimes={graphKeyTimes}
                calcMode='spline'
                keySplines={graphSpline}
              />
              <animate
                attributeName='cy'
                values={node.y}
                dur={graphDuration}
                repeatCount='indefinite'
                keyTimes={graphKeyTimes}
                calcMode='spline'
                keySplines={graphSpline}
              />
              <animate
                attributeName='r'
                values='11;18;13;11'
                dur='2.8s'
                begin={`${index * 0.18}s`}
                repeatCount='indefinite'
              />
            </circle>
            <circle
              cx={initialValue(node.x)}
              cy={initialValue(node.y)}
              r='7'
              fill='currentColor'
            >
              <animate
                attributeName='cx'
                values={node.x}
                dur={graphDuration}
                repeatCount='indefinite'
                keyTimes={graphKeyTimes}
                calcMode='spline'
                keySplines={graphSpline}
              />
              <animate
                attributeName='cy'
                values={node.y}
                dur={graphDuration}
                repeatCount='indefinite'
                keyTimes={graphKeyTimes}
                calcMode='spline'
                keySplines={graphSpline}
              />
              <animate
                attributeName='r'
                values='6;8.5;7;6'
                dur='2.6s'
                begin={`${index * 0.2}s`}
                repeatCount='indefinite'
              />
            </circle>
          </g>
        ))}
      </svg>
      <Grid
        templateColumns='repeat(3, 1fr)'
        gap={2}
        position='absolute'
        left={5}
        right={5}
        bottom={4}
      >
        {['schema', 'domain', 'export'].map((label, index) => (
          <Box
            key={label}
            px={3}
            py={2}
            borderRadius='14px'
            borderWidth='1px'
            borderColor='rgba(255,255,255,0.14)'
            bg='rgba(0,0,0,0.28)'
            color='whiteAlpha.900'
            fontSize='xs'
            fontWeight='700'
            textAlign='center'
            animation={`${chipPulse} 3.2s ease-in-out infinite`}
            animationDelay={`${index * 0.18}s`}
          >
            {label}
          </Box>
        ))}
      </Grid>
    </>
  );
}

function DatasetPreview({ color, visual }: DatasetPreviewProps) {
  return (
    <Box
      h='190px'
      borderRadius='24px'
      borderWidth='1px'
      borderColor={glassBorder}
      bg={previewBg}
      overflow='hidden'
      position='relative'
      p={4}
    >
      <Box
        position='absolute'
        inset='0'
        bg={`linear-gradient(135deg, transparent, ${color}14)`}
      />
      <Box
        position='relative'
        zIndex={1}
        h='full'
      >
        {visual === 'action-video' && <ActionVideoVisual color={color} />}
        {visual === 'object-images' && <ObjectImagesVisual color={color} />}
        {visual === 'audio-events' && <AudioEventsVisual color={color} />}
        {visual === 'domain-dataset' && <DomainDatasetVisual color={color} />}
      </Box>
    </Box>
  );
}

export function SampleDatasets() {
  const [activeDataset, setActiveDataset] = useState<string | null>(null);

  return (
    <Stack
      id='samples'
      gap={{ base: 8, md: 10 }}
      mb={{ base: 18, md: 28 }}
    >
      <FadeUp>
        <SectionHeading
          eyebrow='Sample data'
          title='Make the offer tangible before the first call'
          description='These are example packages. Each project starts with a smaller reviewable sample so your team can approve labels, metadata, and delivery format before scale.'
        />
      </FadeUp>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }}
        gap={5}
      >
        {sampleDatasets.map((dataset, index) => (
          <FadeUp
            key={dataset.title}
            delay={index * 0.12}
          >
            <GlassPanel
              borderRadius='32px'
              p={{ base: 5, md: 6 }}
              hoverable
              onClick={() => setActiveDataset(dataset.title)}
            >
              <DatasetPreview
                color={colors[index] ?? brandPrimary}
                visual={dataset.visual}
              />
              <Stack
                gap={3}
                pt={6}
              >
                <Text
                  color={mutedText}
                  fontSize='xs'
                  fontWeight='700'
                  textTransform='uppercase'
                  lineHeight='1.5'
                >
                  {dataset.meta}
                </Text>
                <Heading
                  as='h3'
                  fontSize={{ base: '2xl', md: '3xl' }}
                  lineHeight='1'
                  fontWeight='600'
                >
                  {dataset.title}
                </Heading>
                <Text
                  color={softText}
                  fontSize='sm'
                >
                  {dataset.description}
                </Text>
              </Stack>
            </GlassPanel>
          </FadeUp>
        ))}
      </Grid>

      <ContactModal
        key={activeDataset ?? ''}
        open={activeDataset !== null}
        onClose={() => setActiveDataset(null)}
        datasetTitle={activeDataset ?? undefined}
      />
    </Stack>
  );
}
