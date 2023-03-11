import { cn } from '@/utils/tw';

interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {}
export default function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={cn('mx-auto max-w-6xl px-1', className)} {...props}>
      {children}
    </div>
  );
}
