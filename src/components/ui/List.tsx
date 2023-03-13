import { cn } from '@/utils/tw';
import Link from 'next/link';

interface IItem {
  title: string;
  description: string;
  href: string;
}

function Item({ title, description, href }: IItem) {
  return (
    <Link href={href} title={title} className="group focus:outline-none">
      <div
        className={cn(
          'relative flex h-full flex-col gap-2 rounded-lg bg-neutral-800 p-4',
          'transition-all duration-100',
          'group-hover:shadow-lg group-hover:shadow-green-700/25 group-hover:ring-1',
          'group-focus:shadow-lg group-focus:shadow-green-700/25 group-focus:ring-1',
          'group-hover:ring-green-700 group-hover:ring-offset-2 group-hover:ring-offset-neutral-900',
          'group-focus:ring-green-700 group-focus:ring-offset-2 group-focus:ring-offset-neutral-900'
        )}
      >
        <h1 className="text-xl font-bold text-neutral-50 line-clamp-1">{title}</h1>
        <p className="text-sm text-neutral-500 line-clamp-3">{description}</p>
        <div
          className={cn(
            'absolute inset-0 h-full w-full rounded-lg p-4',
            'flex items-center justify-center bg-neutral-900/80',
            'text-2xl font-bold',
            'transition duration-100',
            'opacity-0 group-hover:opacity-100 group-focus:opacity-100'
          )}
        >
          <p className="-translate-y-1/2 transition duration-100 group-hover:translate-y-0">Click to Read</p>
        </div>
      </div>
    </Link>
  );
}

interface ListProps {
  items: IItem[];
}

export default function List({ items }: ListProps) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
      {items.map((item, idx) => (
        <Item key={idx} {...item} />
      ))}
    </div>
  );
}
