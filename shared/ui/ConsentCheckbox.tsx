import { Flex, Link, chakra } from '@chakra-ui/react';
import { blue, muted, pillBorder, inkSoft } from '../theme/palette';

type Props = {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

/** Small privacy-policy consent tick with a link to the policy page. */
export function ConsentCheckbox({ id, checked, onChange }: Props) {
  return (
    <Flex
      align='flex-start'
      gap={3}
      fontSize='12px'
      lineHeight='1.5'
      color={muted}
    >
      <chakra.input
        id={id}
        type='checkbox'
        checked={checked}
        required
        onChange={(event) => onChange(event.target.checked)}
        flex='0 0 auto'
        w='16px'
        h='16px'
        mt='2px'
        appearance='none'
        borderWidth='1px'
        borderColor={pillBorder}
        bg={checked ? blue : inkSoft}
        cursor='pointer'
        css={{
          '&:checked': {
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'><path d='M3.5 8.5l3 3 6-7' fill='none' stroke='%230e0f13' stroke-width='2'/></svg>\")",
          },
          '&:focus-visible': { outline: `2px solid ${blue}`, outlineOffset: '2px' },
        }}
      />
      <chakra.label
        htmlFor={id}
        cursor='pointer'
      >
        I agree to the{' '}
        <Link
          href='/privacy-policy'
          target='_blank'
          rel='noopener'
          color='white'
          textDecoration='underline'
          textUnderlineOffset='3px'
        >
          Privacy Policy
        </Link>
      </chakra.label>
    </Flex>
  );
}
