import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { dataTypes } from '../../../shared/landing/content';
import {
  brandCyan,
  brandMint,
  brandPrimary,
  glassBorder,
  softText,
} from '../../../shared/theme/colors';
import { FadeUp } from '../../../shared/ui/FadeUp';
import { SectionHeading } from '../../../shared/ui/SectionHeading';

const accentColors = [brandCyan, brandPrimary, brandMint, '#ff35d1', '#b98cff'];

type DataTypeIconName = (typeof dataTypes)[number]['icon'];

type DataTypeIconProps = {
  color: string;
  icon: DataTypeIconName;
};

function DataTypeIcon({ color, icon }: DataTypeIconProps) {
  const sharedProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
  };

  return (
    <Box
      w='62px'
      h='62px'
      borderRadius='22px'
      borderWidth='1px'
      borderColor='rgba(255,255,255,0.18)'
      bg={`radial-gradient(circle at 64% 28%, ${color}44, transparent 42%), rgba(255,255,255,0.055)`}
      boxShadow={`0 0 32px ${color}35, inset 0 0 26px rgba(255,255,255,0.04)`}
      display='grid'
      placeItems='center'
      color={color}
      position='relative'
      _before={{
        content: '""',
        position: 'absolute',
        inset: '9px',
        borderRadius: '16px',
        borderWidth: '1px',
        borderColor: 'rgba(255,255,255,0.1)',
      }}
    >
      <svg
        viewBox='0 0 48 48'
        width='34'
        height='34'
        style={{ filter: `drop-shadow(0 0 9px ${color})` }}
        aria-hidden='true'
      >
        {icon === 'visual' && (
          <>
            <rect
              x='9'
              y='11'
              width='30'
              height='24'
              rx='4'
              {...sharedProps}
            />
            <path
              d='M15 18h11v8H15zM29 24h5v5h-5'
              {...sharedProps}
            />
            <circle
              cx='34'
              cy='17'
              r='2'
              fill='currentColor'
            />
          </>
        )}
        {icon === 'audio' && (
          <>
            <path
              d='M8 24h4M36 24h4M15 30V18M21 35V13M27 32V16M33 28V20'
              {...sharedProps}
            />
            <circle
              cx='21'
              cy='13'
              r='2'
              fill='currentColor'
            />
            <circle
              cx='27'
              cy='32'
              r='2'
              fill='currentColor'
            />
          </>
        )}
        {icon === 'document' && (
          <>
            <path
              d='M15 8h13l7 7v25H15zM28 8v8h7M20 22h14M20 28h11M20 34h8'
              {...sharedProps}
            />
            <circle
              cx='34'
              cy='34'
              r='2'
              fill='currentColor'
            />
          </>
        )}
        {icon === 'sensor' && (
          <>
            <path
              d='M11 14h9v9h-9zM28 9h9v9h-9zM28 30h9v9h-9zM20 18l8-4M20 23l8 11'
              {...sharedProps}
            />
            <circle
              cx='24'
              cy='24'
              r='3'
              fill='currentColor'
            />
          </>
        )}
        {icon === 'domain' && (
          <>
            <path
              d='M24 8l13 8v16l-13 8-13-8V16zM24 8v32M11 16l13 8 13-8M11 32l13-8 13 8'
              {...sharedProps}
            />
            <circle
              cx='24'
              cy='24'
              r='3'
              fill='currentColor'
            />
          </>
        )}
      </svg>
    </Box>
  );
}

export function DataTypes() {
  return (
    <Stack
      id='data-types'
      gap={{ base: 8, md: 10 }}
      mb={{ base: 18, md: 28 }}
    >
      <FadeUp>
        <SectionHeading
          eyebrow='Data types'
          title='Not limited to one modality or one industry'
          description='Photo and video are strong use cases for us, but the workflow is built around the model requirement: modality, domain rules, annotation schema, and delivery format.'
        />
      </FadeUp>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(5, 1fr)' }}
        gap={4}
      >
        {dataTypes.map((type, index) => {
          const color = accentColors[index] ?? brandPrimary;
          return (
            <FadeUp
              key={type.title}
              delay={index * 0.1}
            >
              <Stack
                gap={4}
                p={{ base: 5, md: 6 }}
                h='full'
                minH={{ base: '180px', xl: '240px' }}
                borderRadius='26px'
                borderWidth='1px'
                borderColor={glassBorder}
                bg='rgba(255,255,255,0.045)'
                position='relative'
                overflow='hidden'
                transition='transform 0.22s ease, border-color 0.22s ease'
                _hover={{ transform: 'translateY(-6px)', borderColor: 'whiteAlpha.400' }}
              >
                <Box
                  position='absolute'
                  top='0'
                  left='0'
                  right='0'
                  h='2px'
                  bg={color}
                  opacity={0.88}
                />
                <DataTypeIcon
                  color={color}
                  icon={type.icon}
                />
                <Heading
                  as='h3'
                  fontSize={{ base: 'xl', md: '2xl' }}
                  lineHeight='1.05'
                  fontWeight='600'
                >
                  {type.title}
                </Heading>
                <Text
                  color={softText}
                  fontSize='sm'
                >
                  {type.description}
                </Text>
              </Stack>
            </FadeUp>
          );
        })}
      </Grid>
    </Stack>
  );
}
