import { findByType } from '@/utils/react';
import { cn } from '@/utils/tw';

interface CardProps extends React.ComponentPropsWithoutRef<'div'> {}

interface HeaderProps extends React.ComponentPropsWithoutRef<'header'> {}
interface BodyProps extends React.ComponentPropsWithoutRef<'main'> {}
interface FooterProps extends React.ComponentPropsWithoutRef<'footer'> {}

const Header = ({ className, ...props }: HeaderProps) => (
  <header className={cn('text-sm font-medium text-neutral-400', className)} {...props} />
);

const Body = ({ className, ...props }: BodyProps) => (
  <main className={cn('flex flex-1 flex-col justify-center', className)} {...props} />
);

const Footer = ({ className, ...props }: FooterProps) => (
  <footer className={cn('text-sm font-medium text-neutral-400', className)} {...props} />
);

function Card({ ...props }: CardProps) {
  function renderHeader() {
    const header = findByType(props.children, Header);
    if (!header) return null;

    return header;
  }

  function renderBody() {
    const body = findByType(props.children, Body);
    if (!body) return null;

    return body;
  }

  function renderFooter() {
    const footer = findByType(props.children, Footer);
    if (!footer) return null;

    return footer;
  }

  return (
    <div
      {...props}
      className={cn(
        'flex aspect-square w-full flex-col justify-between',
        'rounded-2xl bg-neutral-800 p-4 text-center',
        'transition duration-100',
        'hover:shadow-lg'
      )}
    >
      {renderHeader()}
      {renderBody()}
      {renderFooter()}
    </div>
  );
}

Card.Header = Header;
Card.Body = Body;
Card.Footer = Footer;

export default Card;
