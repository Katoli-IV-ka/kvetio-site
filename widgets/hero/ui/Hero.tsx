import { Box, Button, Grid, Heading, HStack, Link, Stack, Text } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';
import { heroCopy, trustSignals } from '../../../shared/landing/content';
import { AccentText } from '../../../shared/ui/AccentText';
import { FadeUp } from '../../../shared/ui/FadeUp';
import {
  brandCyan,
  brandPrimary,
  brandSecondary,
  glassBorder,
  gradientAccent,
  gradientHeroCard,
  mutedText,
  softText,
} from '../../../shared/theme/colors';

const flow = keyframes`
  0% { background-position: 0% 50%; opacity: 0.45; }
  50% { opacity: 1; }
  100% { background-position: 200% 50%; opacity: 0.45; }
`;

const float = keyframes`
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50% { transform: translate3d(0, -18px, 0) rotate(4deg); }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.72; }
  50% { transform: scale(1.08); opacity: 1; }
`;

function DataCube({
  top,
  left,
  size,
  delay = '0s',
}: {
  top: string;
  left: string;
  size: string;
  delay?: string;
}) {
  return (
    <Box
      position='absolute'
      top={top}
      left={left}
      w={size}
      h={size}
      borderWidth='1px'
      borderColor='rgba(255,255,255,0.3)'
      bg='linear-gradient(135deg, rgba(255,255,255,0.2), rgba(154,77,255,0.1) 45%, rgba(52,213,255,0.16))'
      boxShadow={`0 0 32px rgba(154,77,255,0.35), inset 0 0 28px rgba(52,213,255,0.18)`}
      transform='rotate(8deg)'
      animation={`${float} 5s ease-in-out infinite`}
      animationDelay={delay}
      _before={{
        content: '""',
        position: 'absolute',
        inset: '18%',
        borderWidth: '1px',
        borderColor: 'rgba(255,255,255,0.26)',
      }}
    />
  );
}

function FlowLine({
  top,
  left,
  width,
  rotate,
}: {
  top: string;
  left: string;
  width: string;
  rotate: string;
}) {
  return (
    <Box
      position='absolute'
      top={top}
      left={left}
      w={width}
      h='2px'
      bg={`linear-gradient(90deg, transparent, ${brandCyan}, ${brandSecondary}, ${brandPrimary}, transparent)`}
      bgSize='200% 100%'
      transform={`rotate(${rotate})`}
      transformOrigin='left center'
      boxShadow={`0 0 24px ${brandPrimary}`}
      animation={`${flow} 3.8s linear infinite`}
    />
  );
}

function HeroVisual() {
  return (
    <Box
      position='relative'
      minW={0}
      w='full'
      minH={{ base: '360px', md: '540px' }}
      overflow='hidden'
      borderRadius={{ base: '32px', md: '46px' }}
      borderWidth='1px'
      borderColor={glassBorder}
      bg={gradientHeroCard}
      boxShadow='0 40px 120px rgba(0,0,0,0.34)'
    >
      <Box
        position='absolute'
        inset='0'
        bg='radial-gradient(circle at 62% 34%, rgba(255,53,209,0.26), transparent 25%), radial-gradient(circle at 45% 62%, rgba(52,213,255,0.2), transparent 24%), linear-gradient(145deg, rgba(255,255,255,0.08), transparent)'
      />
      <FlowLine
        top='44%'
        left='8%'
        width='88%'
        rotate='-18deg'
      />
      <FlowLine
        top='64%'
        left='12%'
        width='82%'
        rotate='-9deg'
      />
      <FlowLine
        top='38%'
        left='42%'
        width='55%'
        rotate='30deg'
      />
      <DataCube
        top='12%'
        left='64%'
        size='86px'
      />
      <DataCube
        top='42%'
        left='49%'
        size='132px'
        delay='-1.6s'
      />
      <DataCube
        top='69%'
        left='22%'
        size='96px'
        delay='-2.4s'
      />
      <DataCube
        top='73%'
        left='75%'
        size='108px'
        delay='-0.8s'
      />

      <Box
        position='absolute'
        top='48%'
        left='57%'
        w='70px'
        h='70px'
        borderRadius='full'
        bg={`radial-gradient(circle, ${brandSecondary}, ${brandPrimary} 48%, transparent 70%)`}
        filter='blur(1px)'
        animation={`${pulse} 2.8s ease-in-out infinite`}
      />

      <Stack
        position='absolute'
        left={{ base: 5, md: 8 }}
        right={{ base: 5, md: 'auto' }}
        bottom={{ base: 5, md: 8 }}
        gap={3}
        w={{ base: 'auto', md: '260px' }}
      >
        {[
          ['Dataset', 'sample ready'],
          ['Labels', 'QA passed'],
          ['Delivery', 'your format'],
        ].map(([label, value]) => (
          <HStack
            key={label}
            justify='space-between'
            px={4}
            py={3}
            minW={0}
            borderRadius='2xl'
            borderWidth='1px'
            borderColor='rgba(255,255,255,0.18)'
            bg='rgba(6,2,16,0.46)'
            backdropFilter='blur(16px)'
          >
            <Text
              color={mutedText}
              fontSize='xs'
              minW={0}
            >
              {label}
            </Text>
            <Text
              color='white'
              fontSize='sm'
              fontWeight='700'
              whiteSpace='nowrap'
            >
              {value}
            </Text>
          </HStack>
        ))}
      </Stack>
    </Box>
  );
}

export function Hero() {
  return (
    <Grid
      templateColumns={{ base: '1fr', lg: '0.92fr 1.08fr' }}
      alignItems='center'
      gap={{ base: 9, lg: 12 }}
      minH={{ base: 'auto', lg: '680px' }}
      minW={0}
      w='full'
      maxW='100%'
      justifyItems={{ base: 'center', lg: 'stretch' }}
      pt={{ base: 4, md: 8 }}
      pb={{ base: 14, md: 22 }}
    >
      <FadeUp>
        <Stack
          gap={7}
          maxW={{ base: '100%', lg: '690px' }}
          minW={0}
          w='full'
          mx={{ base: 'auto', lg: 0 }}
          justifySelf={{ base: 'stretch', lg: 'auto' }}
          align={{ base: 'center', lg: 'flex-start' }}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          <Text
            color={brandCyan}
            fontSize='sm'
            fontWeight='700'
            letterSpacing='0'
            textTransform='uppercase'
          >
            {heroCopy.eyebrow}
          </Text>
          <Heading
            as='h1'
            fontSize={{ base: '42px', md: '6xl', xl: '72px' }}
            lineHeight={{ base: '1.02', md: '0.96' }}
            fontWeight='500'
            overflowWrap='break-word'
          >
            <Box
              as='span'
              display='block'
            >
              Custom AI
            </Box>
            <Box
              as='span'
              display='block'
            >
              Training Data,
            </Box>
            <Box
              as='span'
              display='block'
            >
              <AccentText>Produced and</AccentText>
            </Box>
            <Box
              as='span'
              display='block'
            >
              <AccentText>Annotated</AccentText> for
            </Box>
            <Box
              as='span'
              display='block'
            >
              Your Model
            </Box>
          </Heading>
          <Text
            color={softText}
            fontSize={{ base: 'lg', md: 'xl' }}
            w='full'
            maxW={{ base: '320px', md: '560px' }}
            mx={{ base: 'auto', lg: 0 }}
            overflowWrap='break-word'
          >
            {heroCopy.description}
          </Text>
          <Stack
            direction={{ base: 'column', md: 'row' }}
            gap={4}
            align={{ base: 'stretch', md: 'center' }}
            w={{ base: 'full', md: 'auto' }}
            maxW={{ base: '320px', md: 'full' }}
            mx={{ base: 'auto', lg: 0 }}
          >
            <Link
              href='#contact'
              _hover={{ textDecoration: 'none' }}
              w={{ base: 'full', md: 'auto' }}
            >
              <Button
                size='lg'
                bg={gradientAccent}
                border='none'
                borderRadius='full'
                color='white'
                px={8}
                w={{ base: 'full', md: 'auto' }}
                boxShadow='0 18px 46px rgba(154,77,255,0.32)'
                _hover={{ transform: 'translateY(-2px)' }}
              >
                {heroCopy.primaryCta}
              </Button>
            </Link>
            <Link
              href='#samples'
              _hover={{ textDecoration: 'none' }}
              w={{ base: 'full', md: 'auto' }}
            >
              <Button
                size='lg'
                variant='outline'
                borderRadius='full'
                borderColor='whiteAlpha.300'
                color='whiteAlpha.900'
                px={8}
                w={{ base: 'full', md: 'auto' }}
                bg='rgba(255,255,255,0.02)'
                _hover={{ bg: 'whiteAlpha.100', transform: 'translateY(-2px)' }}
              >
                {heroCopy.secondaryCta}
              </Button>
            </Link>
          </Stack>
        </Stack>
      </FadeUp>
      <HeroVisual />
    </Grid>
  );
}
