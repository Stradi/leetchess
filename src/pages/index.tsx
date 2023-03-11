import Button from '@/components/Button';
import Chessground from '@/components/Chessground';
import Container from '@/components/Container';
import LegalChess from '@/components/LegalChess';
import AutoPlayingChess from '@/components/pages/index/AutoPlayingChess';
import { cn } from '@/utils/tw';

export default function Home() {
  return (
    <Container className="max-w-sm sm:max-w-4xl">
      <div className="grid grid-cols-1 items-center gap-4 py-4 sm:grid-cols-3 sm:gap-0 sm:py-16">
        <div className="sm:col-span-2">
          <h1 className="max-w-sm text-5xl font-bold text-neutral-100 sm:text-6xl">
            <p className="relative select-none">
              <span
                className={cn(
                  'pr-2 italic text-green-500',
                  'after:absolute after:left-0 after:-bottom-3',
                  'after:text-base after:text-green-700 after:content-["~~~~~~~~~~"] sm:after:content-["~~~~~~~~~~~~"]'
                )}
              >
                Leet
              </span>
              Chess
            </p>
            <p className={cn('my-2 text-2xl font-normal text-neutral-500', 'border-b-4 border-b-neutral-800 pb-2')}>
              noun · [/li:t/]
            </p>
            <p className="text-xl font-medium text-neutral-500 sm:text-2xl">
              Possessing <span className="text-green-500">outstanding skill</span> in a field; expert, masterful.
            </p>
          </h1>
          <br></br>
          <Button asLink href={`/learning-paths`} className="text-lg">
            Check out our Learning Paths
          </Button>
        </div>

        <div className="space-y-2">
          <div className="aspect-square w-full">
            <AutoPlayingChess />
          </div>
          <p className="text-neutral-500">That&apos;s how not to play chess.</p>
        </div>
      </div>
    </Container>
  );
}
