import { Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { whyPoints } from '../../../shared/landing/content';
import { glassBorder, softText } from '../../../shared/theme/colors';
import { AccentText } from '../../../shared/ui/AccentText';
import { FadeUp } from '../../../shared/ui/FadeUp';

export function WhyUs() {
  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '0.85fr 1.15fr' }}
      gap={6}
      mb={{ base: 18, md: 28 }}
      alignItems='stretch'
    >
      <FadeUp>
        <Stack
          gap={5}
          justify='center'
          p={{ base: 7, md: 10 }}
          borderRadius='36px'
          borderWidth='1px'
          borderColor={glassBorder}
          bg='linear-gradient(135deg, rgba(154,77,255,0.18), rgba(255,255,255,0.045))'
        >
          <Text
            color='whiteAlpha.600'
            fontSize='xs'
            fontWeight='700'
            textTransform='uppercase'
          >
            Why Kvet.io
          </Text>
          <Heading
            as='h2'
            fontSize={{ base: '3xl', md: '5xl' }}
            lineHeight='1'
            fontWeight='600'
          >
            Custom data should feel <AccentText>engineered</AccentText>, not improvised.
          </Heading>
          <Text
            color={softText}
            fontSize={{ base: 'sm', md: 'lg' }}
          >
            We keep the creative production and ML delivery sides connected, so the final dataset is
            useful for training instead of just visually attractive.
          </Text>
        </Stack>
      </FadeUp>

      <Stack gap={4}>
        {whyPoints.map((point, index) => (
          <FadeUp
            key={point.title}
            delay={index * 0.1}
          >
            <Stack
              gap={3}
              p={{ base: 6, md: 8 }}
              borderRadius='28px'
              borderWidth='1px'
              borderColor={glassBorder}
              bg='rgba(255,255,255,0.045)'
              transition='transform 0.22s ease, border-color 0.22s ease'
              _hover={{ transform: 'translateY(-6px)', borderColor: 'whiteAlpha.400' }}
            >
              <Heading
                as='h3'
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight='600'
              >
                {point.title}
              </Heading>
              <Text
                color={softText}
                fontSize='sm'
              >
                {point.description}
              </Text>
            </Stack>
          </FadeUp>
        ))}
      </Stack>
    </Grid>
  );
}
