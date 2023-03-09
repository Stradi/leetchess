import { ITag, ITutorial } from '@/types';
import { getUrlFor, PermalinkResources } from '@/utils/permalinks';
import { cn } from '@/utils/tw';
import Link from 'next/link';

interface SingleTutorialProps {
  tutorial: ITutorial;
}

function SingleTutorial({ tutorial }: SingleTutorialProps) {
  return (
    <Link href={getUrlFor(PermalinkResources.Tutorial, [tutorial.slug])} className="group focus:outline-none">
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
        <h1 className="text-xl font-bold text-neutral-50">{tutorial.name}</h1>
        <p className="text-sm text-neutral-500 line-clamp-3">{tutorial.description}</p>
        <div className="flex gap-2">
          {(tutorial.tags as ITag[]).map((tag: ITag) => (
            <p className="text-sm text-neutral-500" key={tag.id}>
              {tag.name}
            </p>
          ))}
        </div>
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

interface TutorialListProps {
  tutorials: ITutorial[];
}

export default function TutorialList({ tutorials }: TutorialListProps) {
  return (
    <div className="grid grid-cols-4 gap-4">
      {tutorials.map((tutorial) => (
        <SingleTutorial key={tutorial.slug} tutorial={tutorial} />
      ))}
    </div>
  );
}
