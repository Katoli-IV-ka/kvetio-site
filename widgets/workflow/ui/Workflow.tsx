import { Box, Grid, Heading, Stack, Text } from '@chakra-ui/react';
import { workflowSteps } from '../../../shared/landing/content';
import { brandCyan, brandPrimary, glassBorder, softText } from '../../../shared/theme/colors';
import { FadeUp } from '../../../shared/ui/FadeUp';
import { SectionHeading } from '../../../shared/ui/SectionHeading';

export function Workflow() {
  return (
    <Stack
      id='workflow'
      gap={{ base: 8, md: 10 }}
      mb={{ base: 18, md: 28 }}
    >
      <FadeUp>
        <SectionHeading
          eyebrow='Workflow'
          title='From model requirement to usable dataset'
          description='The process is intentionally visible. You see the spec, sample, labels, QA pass, and delivery structure before the dataset becomes expensive to scale.'
        />
      </FadeUp>

      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(7, 1fr)' }}
        gap={4}
      >
        {workflowSteps.map((step, index) => (
          <FadeUp
            key={step.title}
            delay={index * 0.12}
          >
            <Stack
              gap={4}
              p={5}
              h='full'
              minH={{ base: '170px', xl: '240px' }}
              borderWidth='1px'
              borderColor={glassBorder}
              borderRadius='24px'
              bg={index % 2 === 0 ? 'rgba(255,255,255,0.055)' : 'rgba(255,255,255,0.035)'}
              position='relative'
              overflow='hidden'
              transition='transform 0.22s ease, border-color 0.22s ease'
              _hover={{ transform: 'translateY(-6px)', borderColor: 'whiteAlpha.400' }}
            >
              <Box
                w='42px'
                h='42px'
                borderRadius='full'
                display='grid'
                placeItems='center'
                bg='rgba(255,255,255,0.08)'
                borderWidth='1px'
                borderColor='whiteAlpha.240'
                color={index % 2 === 0 ? brandCyan : brandPrimary}
                fontWeight='800'
              >
                {index + 1}
              </Box>
              <Heading
                as='h3'
                fontSize='xl'
                lineHeight='1'
                fontWeight='600'
              >
                {step.title}
              </Heading>
              <Text
                color={softText}
                fontSize='sm'
              >
                {step.description}
              </Text>
            </Stack>
          </FadeUp>
        ))}
      </Grid>
    </Stack>
  );
}
