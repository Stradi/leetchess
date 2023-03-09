import { joinReactChildren } from '@/utils/react';
import { cn } from '@/utils/tw';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ChevronRightIcon } from './Icons';

interface BreadcrumbProps {
  whitelistedQueryParams?: string[];
}

export default function Breadcrumb({ whitelistedQueryParams = [] }: BreadcrumbProps) {
  const router = useRouter();

  const [breadcrumbItems, setBreadcrumbItems] = useState<
    {
      href: string;
      label: string;
    }[]
  >();

  useEffect(() => {
    function deslugify(str: string) {
      return str.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
    }

    const items: {
      href: string;
      label: string;
    }[] = [];

    const path = router.asPath.split('?')[0];
    const pathParts = path.split('/').filter((part) => part !== '');

    pathParts.forEach((part, index) => {
      const href = `/${pathParts.slice(0, index + 1).join('/')}`;
      const label = deslugify(part);

      items.push({
        href,
        label,
      });
    });

    // Add query params to the last breadcrumb item.
    const queryParams = Object.entries(router.query)
      .filter(([key]) => whitelistedQueryParams.includes(key))
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    if (queryParams) {
      items.push({
        href: `${router.asPath.split('?')[0]}?${queryParams}`,
        label: queryParams
          .split('&')
          .map((param) => deslugify(param.split('=')[1]))
          .join(', '),
      });
    }

    setBreadcrumbItems(items);

    // We are not adding whitelistedQueryParams to the dependency array because
    // it causes an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, router.query]);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm font-medium text-neutral-400">
        {breadcrumbItems &&
          breadcrumbItems.length > 0 &&
          joinReactChildren(
            breadcrumbItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                aria-current={index === breadcrumbItems.length - 1 ? 'page' : undefined}
              >
                <li
                  className={cn(
                    'flex items-center',
                    'hover:text-neutral-300',
                    index === breadcrumbItems.length - 1 && 'text-neutral-300'
                  )}
                >
                  {item.label}
                </li>
              </Link>
            )),
            <ChevronRightIcon size="xs" stroke="thicker" />
          )}
      </ol>
    </nav>
  );
}
