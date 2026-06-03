import { Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { useCases } from '../../../shared/landing/content';
import { glassBorder, softText } from '../../../shared/theme/colors';
import { FadeUp } from '../../../shared/ui/FadeUp';
import { SectionHeading } from '../../../shared/ui/SectionHeading';

export function UseCases() {
  return (
    <Stack
      id='use-cases'
      gap={{ base: 8, md: 10 }}
      mb={{ base: 18, md: 28 }}
    >
      <FadeUp>
        <SectionHeading
          eyebrow='Use cases'
          title='Data workflows for teams building real AI products'
          description='The same production process adapts to computer vision, speech, text, sensor, multimodal, and specialist domain requirements.'
        />
      </FadeUp>
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
        gap={4}
      >
        {useCases.map((useCase, index) => (
          <FadeUp
            key={useCase.title}
            delay={index * 0.1}
          >
            <Stack
              gap={3}
              p={{ base: 5, md: 6 }}
              borderRadius='24px'
              borderWidth='1px'
              borderColor={glassBorder}
              bg='rgba(255,255,255,0.045)'
              transition='transform 0.22s ease, border-color 0.22s ease'
              _hover={{ transform: 'translateY(-6px)', borderColor: 'whiteAlpha.400' }}
            >
              <Heading
                as='h3'
                fontSize='xl'
                fontWeight='600'
              >
                {useCase.title}
              </Heading>
              <Text
                color={softText}
                fontSize='sm'
              >
                {useCase.description}
              </Text>
            </Stack>
          </FadeUp>
        ))}
      </Grid>
    </Stack>
  );
}
