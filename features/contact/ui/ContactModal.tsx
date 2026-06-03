'use client';

import { useState } from 'react';
import { brandPrimary, gradientAccent, gradientModal } from '../../../shared/theme/colors';
import {
  Button,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Input,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';

type ContactModalProps =
  | {
      triggerLabel?: string;
      fullWidth?: boolean;
      triggerSize?: 'md' | 'lg';
      datasetTitle?: string;
      open?: undefined;
      onClose?: undefined;
    }
  | {
      open: boolean;
      onClose: () => void;
      datasetTitle?: string;
      triggerLabel?: undefined;
      fullWidth?: undefined;
      triggerSize?: undefined;
    };

export function ContactModal({
  triggerLabel = 'Contact us',
  fullWidth = false,
  triggerSize = 'lg',
  datasetTitle,
  open: controlledOpen,
  onClose,
}: ContactModalProps) {
  const isControlled = controlledOpen !== undefined;

  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? controlledOpen : internalOpen;

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(() =>
    datasetTitle ? `I'm interested in the "${datasetTitle}" sample dataset.` : '',
  );
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error' | 'ratelimit'>(
    'idle',
  );

  const handleOpenChange = (e: { open: boolean }) => {
    if (isControlled) {
      if (!e.open) onClose();
    } else {
      setInternalOpen(e.open);
    }
  };

  const handleSubmit = async (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message, datasetTitle }),
      });

      if (res.ok) {
        setStatus('success');
        setEmail('');
        setMessage('');
      } else if (res.status === 429) {
        setStatus('ratelimit');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <DialogRoot
      open={open}
      onOpenChange={handleOpenChange}
    >
      {!isControlled && (
        <DialogTrigger asChild>
          <Button
            size={triggerSize}
            bg={gradientAccent}
            border='none'
            borderRadius='full'
            color='white'
            width={fullWidth ? { base: 'full', md: 'auto' } : undefined}
            px={triggerSize === 'md' ? 5 : 7}
            boxShadow='0 14px 36px rgba(154,77,255,0.28)'
            transition='background 0.2s ease, transform 0.2s ease'
            _hover={{ transform: 'translateY(-2px)' }}
          >
            {triggerLabel}
          </Button>
        </DialogTrigger>
      )}

      <DialogBackdrop
        bg='blackAlpha.800'
        backdropFilter='blur(6px)'
      />

      <DialogPositioner
        position='fixed'
        inset='0'
        display='flex'
        alignItems='center'
        justifyContent='center'
        px={4}
      >
        <DialogContent
          bg={gradientModal}
          color='white'
          borderColor='whiteAlpha.200'
          borderWidth='1px'
          borderRadius='3xl'
          w='full'
          maxW='lg'
          position='relative'
        >
          <DialogHeader
            px={{ base: 7, md: 10 }}
            pt={{ base: 7, md: 10 }}
            pb={0}
          >
            <DialogTitle fontSize={{ base: 'xl', md: '2xl' }}>
              Tell us what data you need
            </DialogTitle>
            {datasetTitle && (
              <Text
                mt={2}
                fontSize='sm'
                color='whiteAlpha.600'
              >
                Sample:{' '}
                <Text
                  as='span'
                  color='white'
                  fontWeight='600'
                >
                  {datasetTitle}
                </Text>
              </Text>
            )}
          </DialogHeader>
          <DialogCloseTrigger
            position='absolute'
            top={4}
            right={4}
            color='whiteAlpha.700'
            _hover={{ color: 'white', bg: 'whiteAlpha.100' }}
            borderRadius='full'
            asChild
          >
            <Button
              variant='ghost'
              size='sm'
              p={1}
              minW='auto'
              h='auto'
            >
              <svg
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              >
                <line
                  x1='18'
                  y1='6'
                  x2='6'
                  y2='18'
                />
                <line
                  x1='6'
                  y1='6'
                  x2='18'
                  y2='18'
                />
              </svg>
            </Button>
          </DialogCloseTrigger>

          <DialogBody
            px={{ base: 7, md: 10 }}
            pb={{ base: 7, md: 10 }}
            pt={6}
          >
            {status === 'success' ? (
              <Text
                color='green.300'
                textAlign='center'
                fontSize={{ base: 'sm', md: 'md' }}
                py={4}
              >
                Message sent. We will get back to you soon.
              </Text>
            ) : (
              <VStack
                as='form'
                gap={4}
                onSubmit={handleSubmit}
              >
                <Input
                  type='email'
                  placeholder='Your email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  fontSize={{ base: 'sm', md: 'md' }}
                  bg='whiteAlpha.50'
                  borderColor='whiteAlpha.300'
                  borderRadius='xl'
                  _focus={{ borderColor: brandPrimary }}
                  _placeholder={{ color: 'whiteAlpha.500' }}
                  autoComplete='email'
                />
                <Textarea
                  placeholder='Describe your data need'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  fontSize={{ base: 'sm', md: 'md' }}
                  bg='whiteAlpha.50'
                  borderColor='whiteAlpha.300'
                  borderRadius='xl'
                  _focus={{ borderColor: brandPrimary }}
                  _placeholder={{ color: 'whiteAlpha.500' }}
                />
                {status === 'error' && (
                  <Text
                    color='red.400'
                    fontSize='sm'
                  >
                    Something went wrong. Please try again.
                  </Text>
                )}
                {status === 'ratelimit' && (
                  <Text
                    color='orange.300'
                    fontSize='sm'
                  >
                    Too many requests. Please wait 10 minutes and try again.
                  </Text>
                )}
                <Button
                  type='submit'
                  bg={gradientAccent}
                  border='none'
                  color='white'
                  borderRadius='full'
                  boxShadow='0 14px 36px rgba(154,77,255,0.25)'
                  transition='background 0.2s ease, transform 0.2s ease'
                  _hover={{ transform: 'translateY(-2px)' }}
                  width='full'
                  size='lg'
                  loading={status === 'loading'}
                  loadingText='Sending...'
                >
                  Send message
                </Button>
              </VStack>
            )}
          </DialogBody>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  );
}
