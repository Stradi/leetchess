import { cn } from '@/utils/tw';
import Link from 'next/link';
import ConditionalWrapper from './ConditionalWrapper';

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  asLink?: boolean;
  href?: string;
}
export default function Button({
  variant = 'primary',
  disabled = false,
  asLink = false,
  href = '',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <ConditionalWrapper
      condition={asLink}
      wrapper={(children) => (
        <Link href={href} className={className}>
          {children}
        </Link>
      )}
    >
      <button
        {...props}
        className={cn(
          'rounded-3xl px-4 py-2 text-sm font-medium outline-none',
          'transition duration-100',
          'hover:-translate-y-0.5 focus:-translate-y-0.5',
          variant === 'primary' &&
            [
              'bg-green-900 text-neutral-200',
              !disabled ? 'hover:bg-green-700 hover:text-white hover:shadow-lg hover:shadow-green-900/50' : '',
              !disabled ? 'active:bg-green-900 active:text-neutral-200 active:translate-y-0 active:shadow-none' : '',
              !disabled ? 'focus:bg-green-700 focus:text-white focus:shadow-lg focus:shadow-green-900/50' : '',
            ].join(' '),
          variant === 'secondary' &&
            [
              'bg-transparent text-neutral-200 ring-2 ring-green-900 ring-inset',
              !disabled ? 'hover:ring-green-700 hover:text-white' : '',
              !disabled ? 'active:ring-green-900 active:text-neutral-200 active:translate-y-0' : '',
              !disabled ? 'focus:ring-green-700 focus:text-white' : '',
            ].join(' '),

          disabled && 'cursor-not-allowed opacity-50 hover:translate-y-0 focus:translate-y-0',
          className
        )}
      >
        {children}
      </button>
    </ConditionalWrapper>
  );
}
