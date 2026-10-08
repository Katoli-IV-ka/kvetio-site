import type { ReactNode } from 'react';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { pillarCopy } from '../../../shared/landing/site-content';
import { hairline, ink, inkSoft } from '../../../shared/theme/palette';
import { Grain } from '../../../shared/ui/Grain';

const MONO = "'JetBrains Mono', ui-monospace, monospace";

function Card({
  children,
  bg,
  bordered = false,
}: {
  children: ReactNode;
  bg: string;
  bordered?: boolean;
}) {
  return (
    <Box
      as='article'
      flex='1 1 300px'
      minW='0'
      aspectRatio='376 / 519'
      position='relative'
      overflow='hidden'
      borderRadius='28px'
      boxSizing='border-box'
      borderWidth={bordered ? '1px' : '0'}
      borderColor={hairline}
      bg={bg}
    >
      {children}
    </Box>
  );
}

function Fill({ src, alt, position }: { src: string; alt: string; position?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      loading='lazy'
      position='absolute'
      inset='0'
      w='100%'
      h='100%'
      objectFit='cover'
      objectPosition={position}
    />
  );
}

export function Pillars() {
  return (
    <Box
      as='section'
      bg={ink}
      px={{ base: 4, md: 8 }}
      py={6}
    >
      <Box
        display='flex'
        flexWrap='wrap'
        gap={6}
      >
        <Card
          bg={inkSoft}
          bordered
        >
          <Fill
            src='/images/v2/pillar-field.jpg'
            alt='A man working at a vintage computer alone in a green field'
            position='50% 78%'
          />
          <Grain opacity={0.5} />
          <Box
            position='absolute'
            inset='0'
            bg='linear-gradient(180deg,rgba(10,11,14,.55) 0%,rgba(10,11,14,.38) 45%,rgba(10,11,14,.25) 100%)'
          />
          <Text
            position='absolute'
            left='41px'
            top='40px'
            color='#c9ccd3'
            fontFamily={MONO}
            fontSize='11px'
            letterSpacing='.08em'
            textTransform='uppercase'
          >
            {pillarCopy.proprietary.eyebrow}
          </Text>
          <Heading
            as='h3'
            position='absolute'
            left='41px'
            right='41px'
            top='36%'
            m='0'
            fontSize={{ base: '30px', xl: '38px' }}
            lineHeight='1.06'
            fontWeight='600'
            letterSpacing='-0.015em'
            color='white'
            textShadow='0 2px 18px rgba(0,0,0,.35)'
          >
            {pillarCopy.proprietary.title}
          </Heading>
        </Card>

        <Card bg='#f1efe9'>
          <Box
            position='absolute'
            inset='0'
            bg='linear-gradient(180deg,#f3f1ec 0%,#efece6 100%)'
          />
          <Image
            src='/images/v2/pillar-halftone.jpg'
            alt=''
            aria-hidden='true'
            loading='lazy'
            position='absolute'
            inset='0'
            w='100%'
            h='100%'
            objectFit='cover'
            mixBlendMode='multiply'
            opacity={0.32}
          />
          <Grain opacity={0.5} />
          <Text
            position='absolute'
            left='41px'
            top='40px'
            color='#3a3d45'
            fontFamily={MONO}
            fontSize='11px'
            letterSpacing='.08em'
            textTransform='uppercase'
          >
            {pillarCopy.anyData.eyebrow}
          </Text>
          <Box
            position='absolute'
            left='41px'
            right='41px'
            top='36%'
          >
            <Heading
              as='h3'
              m='0'
              fontSize={{ base: '30px', xl: '38px' }}
              lineHeight='1.06'
              fontWeight='700'
              letterSpacing='-0.015em'
              color={ink}
            >
              {pillarCopy.anyData.title}
            </Heading>
            <Text
              mt='2px'
              fontSize={{ base: '27px', xl: '34px' }}
              lineHeight='1.1'
              fontWeight='300'
              letterSpacing='-0.01em'
              color='#4a4d55'
            >
              {pillarCopy.anyData.subtitle}
            </Text>
          </Box>
          <Text
            position='absolute'
            left='41px'
            right='41px'
            bottom='40px'
            m='0'
            fontSize='15px'
            lineHeight='1.55'
            color='#33363d'
          >
            {pillarCopy.anyData.description}
          </Text>
        </Card>

        <Card
          bg='#5f86b8'
          bordered
        >
          <Fill
            src='/images/v2/pillar-sky.jpg'
            alt='Clear blue sky'
          />
          <Grain opacity={0.5} />
          <Box
            position='absolute'
            inset='0'
            bg='linear-gradient(180deg,rgba(8,16,36,.12) 0%,rgba(8,16,36,.22) 100%)'
          />
          <Box
            position='absolute'
            left='36px'
            right='36px'
            top='50%'
            textAlign='center'
            transform='translateY(-62%)'
          >
            <Heading
              as='h3'
              m='0'
              fontSize={{ base: '42px', xl: '52px' }}
              lineHeight='1.02'
              fontWeight='700'
              letterSpacing='-0.02em'
              color='white'
              textShadow='0 3px 22px rgba(0,0,0,.45)'
            >
              Rights-
              <br />
              ready
            </Heading>
            <Text
              mt='18px'
              mx='auto'
              maxW='290px'
              fontSize='14px'
              lineHeight='1.5'
              color='#d3d5da'
            >
              {pillarCopy.rights.description}
            </Text>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
