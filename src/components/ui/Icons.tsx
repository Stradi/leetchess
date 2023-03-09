import { cn } from '@/utils/tw';

interface BaseIconProps extends React.ComponentPropsWithoutRef<'i'> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  stroke?: 'thinner' | 'thin' | 'medium' | 'thick' | 'thicker';
  fillColor?: string;
  svgClassName?: string;
}

function BaseIcon({
  size = 'md',
  stroke = 'medium',
  fillColor,
  svgClassName,
  children,
  className,
  ...props
}: BaseIconProps) {
  return (
    <i {...props} className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor || 'none'}
        viewBox="0 0 24 24"
        strokeWidth={cn(
          stroke == 'thinner' && 0.5,
          stroke == 'thin' && 1,
          stroke == 'medium' && 1.5,
          stroke == 'thick' && 2,
          stroke == 'thicker' && 3
        )}
        stroke="currentColor"
        className={cn(
          size == 'xs' && 'h-3 w-3',
          size == 'sm' && 'h-4 w-4',
          size == 'md' && 'h-6 w-6',
          size == 'lg' && 'h-8 w-8',
          size == 'xl' && 'h-16 w-16',
          svgClassName
        )}
      >
        {children}
      </svg>
    </i>
  );
}

export function ChevronDownIcon({ ...props }: BaseIconProps) {
  return (
    <BaseIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </BaseIcon>
  );
}

export function ChevronRightIcon({ ...props }: BaseIconProps) {
  return (
    <BaseIcon {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </BaseIcon>
  );
}
