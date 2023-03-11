import { INavigationItem } from '@/config/config.types';
import { cn } from '@/utils/tw';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { ChevronDownIcon } from './Icons';

interface NavigationBarProps {
  items: INavigationItem[];
}

export default function NavigationBar({ items }: NavigationBarProps) {
  return (
    <NavigationMenu.Root className={cn('relative flex justify-center p-2', 'mt-2 rounded-2xl bg-neutral-800')}>
      <NavigationMenu.List className="flex items-center gap-2">
        <NavigationMenu.Item className="group">
          <NavigationMenu.Link
            className={cn(
              'text-sm font-medium text-neutral-400',
              'inline-block select-none',
              'rounded-2xl px-4 py-1',
              'hover:bg-neutral-700/50 hover:text-neutral-50',
              'transition-colors duration-100'
            )}
            href="/"
          >
            <span className="pr-0.5 italic text-green-600 group-hover:text-green-500">Leet</span>Chess
          </NavigationMenu.Link>
        </NavigationMenu.Item>
        {items.map((item, idx) => (
          <NavigationMenu.Item key={item.href} className={cn('text-sm font-medium text-neutral-400')}>
            {item.megaMenu ? (
              <>
                <NavigationMenu.Trigger
                  className={cn(
                    'group flex items-center gap-1 rounded-2xl px-4 py-1',
                    'hover:bg-neutral-700/50 hover:text-neutral-50',
                    'transition-colors duration-100',
                    'data-[state=open]:bg-neutral-700/50 data-[state=open]:text-neutral-50'
                  )}
                >
                  {item.label}
                  {item.megaMenu && (
                    <ChevronDownIcon
                      size="xs"
                      stroke="thicker"
                      className={cn("transition-transform duration-200 group-data-[state='open']:rotate-180")}
                    />
                  )}
                </NavigationMenu.Trigger>
                <NavigationMenu.Content
                  className={cn(
                    'absolute top-0 left-0 w-full rounded-2xl bg-neutral-800 p-4',
                    'data-[motion=from-start]:animate-enterFromLeft data-[motion=from-end]:animate-enterFromRight',
                    'data-[motion=to-start]:animate-exitToLeft data-[motion=to-end]:animate-exitToRight',
                    'sm:w-auto'
                  )}
                >
                  <ul className={cn('grid w-full grid-cols-1 gap-1', 'sm:w-96 sm:grid-cols-2')}>
                    <li
                      className={cn('select-none p-2 text-center', 'border-b-2 border-b-neutral-700', 'sm:col-span-2')}
                    >
                      <h3 className="text-sm font-medium text-neutral-50">{item.megaMenu.title}</h3>
                      <p className="text-sm text-neutral-400">{item.megaMenu.description}</p>
                    </li>
                    {item.megaMenu.items.map((megaMenuItem, megaMenuItemIdx) => (
                      <li key={megaMenuItemIdx} className="">
                        <NavigationMenu.Link
                          className={cn(
                            'flex h-full select-none flex-col items-start justify-center text-left sm:items-center sm:text-center',
                            'rounded-2xl px-4 py-2 text-sm',
                            'hover:bg-neutral-700/50',
                            'transition-colors duration-100'
                          )}
                          href={megaMenuItem.href}
                        >
                          <h3 className="font-medium text-neutral-50">{megaMenuItem.label}</h3>
                          <p className="text-neutral-400">{megaMenuItem.description}</p>
                        </NavigationMenu.Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenu.Content>
              </>
            ) : (
              <NavigationMenu.Link
                className={cn(
                  'inline-block select-none',
                  'rounded-2xl px-4 py-1',
                  'hover:bg-neutral-700/50 hover:text-neutral-50',
                  'transition-colors duration-100'
                )}
                href={item.href}
              >
                {item.label}
              </NavigationMenu.Link>
            )}
          </NavigationMenu.Item>
        ))}
        <NavigationMenu.Indicator className={cn('flex h-3 justify-center', 'duration-200 ease-out')}>
          <div
            className={cn(
              'relative top-1/3 h-3 w-3 rotate-45',
              'rounded-t-sm border-2 border-neutral-900 bg-neutral-800'
            )}
          />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>
      <div className={cn('absolute top-full left-0 flex w-full justify-center')}>
        <NavigationMenu.Viewport
          className={cn(
            'relative z-10 mt-0.5 overflow-hidden rounded-2xl drop-shadow-md',
            'h-[var(--radix-navigation-menu-viewport-height)] w-full sm:w-[var(--radix-navigation-menu-viewport-width)]',
            'transition-[width,_height] duration-100 data-[state=open]:animate-scaleIn data-[state=closed]:animate-scaleOut'
          )}
        />
      </div>
    </NavigationMenu.Root>
  );
}
