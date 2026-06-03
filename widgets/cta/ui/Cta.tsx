import { Heading, Stack, Text } from '@chakra-ui/react';
import { ContactModal } from '../../../features/contact/ui/ContactModal';
import { glassBorder, softText } from '../../../shared/theme/colors';
import { FadeUp } from '../../../shared/ui/FadeUp';

export function Cta() {
  return (
    <FadeUp>
      <Stack
        id='contact'
        direction={{ base: 'column', md: 'row' }}
        justify='space-between'
        align='center'
        gap={8}
        px={{ base: 7, md: 10 }}
        py={{ base: 8, md: 12 }}
        borderRadius='36px'
        borderWidth='1px'
        borderColor={glassBorder}
        bg='radial-gradient(circle at 78% 22%, rgba(255,53,209,0.18), transparent 30%), linear-gradient(135deg, rgba(154,77,255,0.2), rgba(255,255,255,0.045))'
        mb={{ base: 8, md: 12 }}
      >
        <Stack
          gap={3}
          textAlign={{ base: 'center', md: 'left' }}
        >
          <Heading
            as='h2'
            fontSize={{ base: '3xl', md: '5xl' }}
            lineHeight='1'
            fontWeight='600'
          >
            Tell us what data your model needs
          </Heading>
          <Text
            color={softText}
            fontSize={{ base: 'sm', md: 'lg' }}
            maxW='620px'
          >
            One email and one short description is enough. We will turn it into a dataset plan and a
            sample-first delivery approach.
          </Text>
        </Stack>
        <ContactModal
          triggerLabel='Request dataset plan'
          fullWidth
        />
      </Stack>
    </FadeUp>
  );
}
