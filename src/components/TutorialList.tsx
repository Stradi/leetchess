import { cn } from "@/utils/tw";
import Link from "next/link";
import Button from "./Button";

interface SingleTutorialProps {
  tutorial: IChessTutorialMeta;
}

function SingleTutorial({ tutorial }: SingleTutorialProps) {
  return (
    <div
      className={cn(
        "flex aspect-square w-full flex-col justify-between",
        "rounded-2xl bg-neutral-800 p-4 text-center",
        "transition duration-100",
        "hover:shadow-lg"
      )}
    >
      <div className="space-x-1 text-sm font-medium text-neutral-400">
        {(tutorial.tags as ITag[]).map((tag: ITag) => (
          <Link key={tag.slug} href={`/learn/tag/${tag.slug}`}>
            <span
              className={cn(
                "inline-block select-none rounded-full px-2 py-1",
                "transition duration-100",
                " hover:bg-green-700 hover:text-white hover:shadow-md hover:shadow-green-900/50"
              )}
            >
              {tag.name}
            </span>
          </Link>
        ))}
      </div>
      <div className="">
        <h2 className="text-2xl font-bold text-neutral-50">{tutorial.name}</h2>
        <p className="text-sm font-medium text-neutral-400">
          {tutorial.subtitle}
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          asLink
          href={`/learn/${tutorial.slug}/read`}
          className="w-full"
        >
          Read
        </Button>
        <Button
          variant="primary"
          asLink
          href={`/learn/${tutorial.slug}`}
          className="w-full"
        >
          Learn
        </Button>
      </div>
    </div>
  );
}

interface TutorialListProps {
  tutorials: IChessTutorialMeta[];
}

export default function TutorialList({ tutorials }: TutorialListProps) {
  return (
    <div className="grid grid-cols-4">
      {tutorials.map((tutorial) => (
        <SingleTutorial key={tutorial.slug} tutorial={tutorial} />
      ))}
    </div>
  );
}
