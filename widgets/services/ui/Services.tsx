import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { services } from '../../../shared/landing/content';
import {
  brandCyan,
  brandPrimary,
  gradientAccent,
  mutedText,
  softText,
} from '../../../shared/theme/colors';
import { FadeUp } from '../../../shared/ui/FadeUp';
import { GlassPanel } from '../../../shared/ui/GlassPanel';
import { SectionHeading } from '../../../shared/ui/SectionHeading';

export function Services() {
  return (
    <Stack
      id='services'
      gap={{ base: 8, md: 10 }}
      mb={{ base: 18, md: 28 }}
    >
      <FadeUp>
        <SectionHeading
          eyebrow='Services'
          title='One team for collection, production, annotation, and delivery'
          description='A dataset is not just a folder of files. We plan the data spec, create or source the content, label it, review it, and deliver it in a structure your ML team can use.'
        />
      </FadeUp>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }}
        gap={5}
      >
        {services.map((service, index) => (
          <FadeUp
            key={service.title}
            delay={index * 0.1}
          >
            <GlassPanel
              borderRadius='28px'
              p={{ base: 6, md: 7 }}
              minH='300px'
              position='relative'
              overflow='hidden'
              transition='transform 0.25s ease, border-color 0.25s ease'
              _hover={{ transform: 'translateY(-6px)', borderColor: 'whiteAlpha.400' }}
            >
              <Box
                position='absolute'
                top='0'
                left='0'
                right='0'
                h='2px'
                bg={gradientAccent}
                opacity={0.8}
              />
              <Text
                color={mutedText}
                fontSize='sm'
                fontWeight='700'
              >
                0{index + 1}
              </Text>
              <Stack
                gap={4}
                mt={8}
              >
                <Text
                  color={index % 2 === 0 ? brandCyan : brandPrimary}
                  fontSize='sm'
                  fontWeight='700'
                >
                  {service.stat}
                </Text>
                <Heading
                  as='h3'
                  fontSize={{ base: '2xl', md: '3xl' }}
                  lineHeight='1.05'
                  fontWeight='600'
                >
                  {service.title}
                </Heading>
                <Text
                  color={softText}
                  fontSize='sm'
                >
                  {service.description}
                </Text>
              </Stack>
            </GlassPanel>
          </FadeUp>
        ))}
      </Grid>
    </Stack>
  );
}
