import { getUrlFor, PermalinkResources } from "@/utils/permalinks";
import { cn } from "@/utils/tw";
import Link from "next/link";
import Button from "./Button";
import Card from "./ui/Card";

interface SingleTutorialProps {
  tutorial: IChessTutorialMeta;
}

function SingleTutorial({ tutorial }: SingleTutorialProps) {
  return (
    <Card>
      <Card.Header className="space-x-1">
        {(tutorial.tags as ITag[]).map((tag: ITag) => (
          <Link
            key={tag.slug}
            href={getUrlFor(PermalinkResources.Tag, [], {
              filter: tag.slug,
            })}
          >
            <span
              className={cn(
                "inline-block select-none rounded-full px-2 py-1",
                "transition duration-100",
                " hover:bg-neutral-700/50 hover:text-white"
              )}
            >
              {tag.name}
            </span>
          </Link>
        ))}
      </Card.Header>
      <Card.Body>
        <h2 className="text-2xl font-bold text-neutral-50">{tutorial.name}</h2>
        <p className="text-sm font-medium text-neutral-400">
          {tutorial.subtitle}
        </p>
      </Card.Body>
      <Card.Footer>
        <Button
          variant="primary"
          asLink
          href={getUrlFor(PermalinkResources.Tutorial, [tutorial.slug])}
          className="w-full"
        >
          Learn
        </Button>
      </Card.Footer>
    </Card>
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
