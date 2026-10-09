import { blue, inkSoft, pillBorder } from '../theme/palette';

/** Square dark inputs shared by the landing contact band and the contact page. */
export const fieldProps = {
  w: '100%',
  h: '48px',
  px: 4,
  borderRadius: '0',
  borderWidth: '1px',
  borderColor: pillBorder,
  bg: inkSoft,
  color: 'white',
  fontSize: '14px',
  _placeholder: { color: '#5d6472' },
  _focusVisible: { borderColor: blue, outline: 'none', boxShadow: 'none' },
} as const;
