import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { credibilityStats, qualityPoints } from '../../../shared/landing/content';
import {
  brandCyan,
  brandMint,
  brandPrimary,
  glassBorder,
  gradientAccent,
  softText,
} from '../../../shared/theme/colors';
import { FadeUp } from '../../../shared/ui/FadeUp';
import { GlassPanel } from '../../../shared/ui/GlassPanel';
import { SectionHeading } from '../../../shared/ui/SectionHeading';

export function QualitySystem() {
  return (
    <Grid
      id='quality'
      templateColumns={{ base: '1fr', lg: '0.92fr 1.08fr' }}
      gap={6}
      alignItems='stretch'
      mb={{ base: 18, md: 28 }}
    >
      <GlassPanel
        borderRadius='36px'
        p={{ base: 7, md: 10 }}
        minH='440px'
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        position='relative'
        overflow='hidden'
      >
        <Box
          position='absolute'
          right='-120px'
          top='-120px'
          w='320px'
          h='320px'
          borderRadius='full'
          bg='radial-gradient(circle, rgba(52,213,255,0.18), transparent 68%)'
        />
        <FadeUp>
          <SectionHeading
            eyebrow='Quality system'
            title='Built for model training, not just file delivery'
            description='The output has to survive engineering review: clear rights, consistent labels, usable metadata, and the export format your training pipeline expects.'
          />
        </FadeUp>
        <Grid
          templateColumns={{ base: '1fr', sm: 'repeat(3, 1fr)' }}
          gap={3}
          mt={10}
        >
          {credibilityStats.map((stat, index) => (
            <FadeUp
              key={stat.label}
              delay={index * 0.1}
            >
              <Stack
                gap={1}
                p={4}
                borderRadius='20px'
                bg='rgba(255,255,255,0.055)'
                borderWidth='1px'
                borderColor='rgba(255,255,255,0.16)'
              >
                <Text
                  color={index === 0 ? brandCyan : index === 1 ? brandMint : brandPrimary}
                  fontSize='2xl'
                  fontWeight='800'
                  lineHeight='1'
                >
                  {stat.value}
                </Text>
                <Text
                  color={softText}
                  fontSize='xs'
                >
                  {stat.label}
                </Text>
              </Stack>
            </FadeUp>
          ))}
        </Grid>
      </GlassPanel>

      <Stack gap={4}>
        {qualityPoints.map((point, index) => (
          <FadeUp
            key={point}
            delay={index * 0.1}
          >
            <Grid
              templateColumns='48px 1fr'
              alignItems='center'
              gap={4}
              p={{ base: 5, md: 6 }}
              borderRadius='24px'
              borderWidth='1px'
              borderColor={glassBorder}
              bg='rgba(255,255,255,0.045)'
              transition='transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease'
              _hover={{
                transform: 'translateY(-6px)',
                borderColor: 'rgba(255,255,255,0.32)',
                boxShadow: '0 8px 32px rgba(52,213,255,0.15)',
              }}
            >
              <Box
                w='48px'
                h='48px'
                borderRadius='18px'
                bg={index === 0 ? gradientAccent : 'rgba(255,255,255,0.08)'}
                display='grid'
                placeItems='center'
                color='white'
                fontWeight='800'
              >
                {String(index + 1).padStart(2, '0')}
              </Box>
              <Heading
                as='h3'
                fontSize={{ base: 'md', md: 'lg' }}
                fontWeight='600'
              >
                {point}
              </Heading>
            </Grid>
          </FadeUp>
        ))}
      </Stack>
    </Grid>
  );
}
