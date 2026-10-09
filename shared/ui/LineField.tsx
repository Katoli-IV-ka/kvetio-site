import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';
import { Box, chakra } from '@chakra-ui/react';
import { blue, muted } from '../theme/palette';

const LINE = '#3a3e48';

const control = {
  display: 'block',
  width: '100%',
  height: '50px',
  padding: '10px 0 0',
  margin: '0',
  background: 'transparent',
  border: '0',
  borderBottom: `1px solid ${LINE}`,
  borderRadius: '0',
  color: '#fff',
  fontSize: '15px',
  fontFamily: 'inherit',
  outline: 'none',
  transition: 'border-color .2s',
  '&:focus': { borderBottomColor: '#fff' },
  '&:focus-visible': { borderBottomColor: blue },
} as const;

/** Shared wrapper: label sits on the line and floats up once the field is focused or filled. */
const wrapperCss = {
  position: 'relative',
  paddingTop: '22px',
  '& > label': {
    position: 'absolute',
    left: 0,
    top: '40px',
    color: muted,
    fontSize: '15px',
    pointerEvents: 'none',
    transformOrigin: 'left top',
    transition: 'transform .18s ease, color .18s ease',
  },
  '& > :is(input, textarea):focus + label, & > :is(input, textarea):not(:placeholder-shown) + label':
    { transform: 'translateY(-32px) scale(0.78)' },
  '& > :is(input, textarea):focus + label': { color: '#fff' },
  '& > .line-select + label': { transform: 'translateY(-32px) scale(0.78)' },
} as const;

type Base = { label: string; id: string };

export function LineInput({
  label,
  id,
  required,
  ...rest
}: Base & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'placeholder'>) {
  return (
    <Box css={wrapperCss}>
      <chakra.input
        id={id}
        placeholder=' '
        required={required}
        css={control}
        {...rest}
      />
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden='true'>*</span>}
      </label>
    </Box>
  );
}

export function LineTextarea({
  label,
  id,
  required,
  ...rest
}: Base & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'id' | 'placeholder'>) {
  return (
    <Box css={wrapperCss}>
      <chakra.textarea
        id={id}
        placeholder=' '
        required={required}
        rows={3}
        css={{
          ...control,
          height: 'auto',
          minHeight: '96px',
          paddingTop: '10px',
          resize: 'vertical',
        }}
        {...rest}
      />
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden='true'>*</span>}
      </label>
    </Box>
  );
}

export function LineSelect({
  label,
  id,
  required,
  children,
  ...rest
}: Base & { children: ReactNode } & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'id'>) {
  return (
    <Box css={wrapperCss}>
      <chakra.select
        id={id}
        className='line-select'
        required={required}
        css={{ ...control, colorScheme: 'dark', cursor: 'pointer' }}
        {...rest}
      >
        {children}
      </chakra.select>
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden='true'>*</span>}
      </label>
    </Box>
  );
}
