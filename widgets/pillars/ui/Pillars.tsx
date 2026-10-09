import { useRef, useState, type ReactNode } from 'react';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import { pillarCopy, pillarsHeading } from '../../../shared/landing/site-content';
import { hairline, ink, inkSoft } from '../../../shared/theme/palette';
import { Grain } from '../../../shared/ui/Grain';

const MONO = "'JetBrains Mono', ui-monospace, monospace";

function Card({
  children,
  bg,
  bordered = false,
  fill = false,
}: {
  children: ReactNode;
  bg: string;
  bordered?: boolean;
  fill?: boolean;
}) {
  return (
    <Box
      as='article'
      flex={fill ? undefined : '1 1 300px'}
      minW='0'
      aspectRatio={fill ? undefined : '376 / 519'}
      w={fill ? '100%' : undefined}
      h={fill ? '100%' : undefined}
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

const DECK_OFFSET = 16;
const SWIPE_DISTANCE = 70;
const FLY_MS = 280;

/** Mobile deck: the three cards stacked like playing cards; swipe or tap the top one to send it to the back. */
function Deck({ cards }: { cards: ReactNode[] }) {
  const [order, setOrder] = useState(() => cards.map((_, index) => index));
  const [drag, setDrag] = useState(0);
  const [flying, setFlying] = useState<0 | 1 | -1>(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const moved = useRef(false);

  const sendToBack = (direction: 1 | -1) => {
    if (flying) return;
    setFlying(direction);
    window.setTimeout(() => {
      setOrder(([first, ...rest]) => [...rest, first as number]);
      setFlying(0);
      setDrag(0);
    }, FLY_MS);
  };

  const onPointerDown = (event: React.PointerEvent) => {
    startX.current = event.clientX;
    moved.current = false;
    setDragging(true);
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  };
  const onPointerMove = (event: React.PointerEvent) => {
    if (startX.current === null || flying) return;
    const dx = event.clientX - startX.current;
    if (Math.abs(dx) > 6) moved.current = true;
    setDrag(dx);
  };
  const onPointerUp = () => {
    if (startX.current === null) return;
    startX.current = null;
    setDragging(false);
    if (Math.abs(drag) > SWIPE_DISTANCE) {
      sendToBack(drag > 0 ? 1 : -1);
    } else if (!moved.current) {
      sendToBack(1);
    } else {
      setDrag(0);
    }
  };

  const depth = cards.length - 1;
  return (
    <Box
      display={{ base: 'block', md: 'none' }}
      maxW='420px'
      mx='auto'
      pr={`${depth * DECK_OFFSET}px`}
    >
      <Box
        position='relative'
        aspectRatio='376 / 519'
        css={{ touchAction: 'pan-y', userSelect: 'none' }}
      >
        {order.map((cardIndex, position) => {
          const isTop = position === 0;
          const fly = isTop && flying !== 0;
          const dx = isTop ? (fly ? flying * 130 : drag) : 0;
          const lift = fly ? 0 : position;
          const scale = 1 - lift * 0.05;
          const rotate = isTop ? (fly ? flying * 12 : drag / 18) : 0;
          return (
            <Box
              key={cardIndex}
              position='absolute'
              inset='0'
              zIndex={cards.length - position}
              opacity={fly ? 0.0 : 1}
              pointerEvents={isTop ? 'auto' : 'none'}
              cursor={isTop ? 'grab' : 'default'}
              onPointerDown={isTop ? onPointerDown : undefined}
              onPointerMove={isTop ? onPointerMove : undefined}
              onPointerUp={isTop ? onPointerUp : undefined}
              onPointerCancel={isTop ? onPointerUp : undefined}
              css={{
                transform: `translate(${fly ? `${dx}%` : `${dx + lift * DECK_OFFSET}px`}, 0) rotate(${rotate}deg) scale(${scale})`,
                transformOrigin: '0% 100%',
                transition:
                  isTop && !fly && dragging
                    ? 'none'
                    : `transform ${FLY_MS}ms ease, opacity ${FLY_MS}ms ease`,
                boxShadow: '0 18px 40px rgba(0,0,0,0.45)',
                borderRadius: '28px',
              }}
            >
              {cards[cardIndex]}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export function Pillars() {
  const renderCards = (fill: boolean): ReactNode[] => [
    <Card
      key='proprietary'
      fill={fill}
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
    </Card>,

    <Card
      key='any-data'
      fill={fill}
      bg='#f1efe9'
    >
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
    </Card>,

    <Card
      key='rights'
      fill={fill}
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
    </Card>,
  ];

  return (
    <Box
      as='section'
      bg={ink}
      px={{ base: 5, md: 16 }}
      py={{ base: 6, md: 10 }}
    >
      <Heading
        as='h2'
        maxW='1312px'
        mx='auto'
        mt={{ base: 8, md: 12 }}
        mb={{ base: 8, md: 12 }}
        fontSize={{ base: '30px', md: '40px' }}
        lineHeight='1.08'
        fontWeight='500'
        letterSpacing='-0.01em'
        textTransform='uppercase'
        color='white'
      >
        {pillarsHeading}
      </Heading>
      <Box
        display={{ base: 'none', md: 'flex' }}
        maxW='1312px'
        mx='auto'
        flexWrap='wrap'
        gap={6}
      >
        {renderCards(false)}
      </Box>
      <Deck cards={renderCards(true)} />
    </Box>
  );
}
