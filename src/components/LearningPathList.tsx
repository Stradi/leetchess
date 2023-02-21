import { getUrlFor, PermalinkResources } from "@/utils/permalinks";
import { cn } from "@/utils/tw";
import Link from "next/link";
import Button from "./Button";
import Card from "./ui/Card";

interface SingleLearningPathProps {
  learningPath: ILearningPath;
}

function SingleLearningPath({ learningPath }: SingleLearningPathProps) {
  return (
    <Card>
      <Card.Header className="space-x-1">
        {(learningPath.tags as ITag[]).map((tag: ITag) => (
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
        <h2 className="text-2xl font-bold text-neutral-50">
          {learningPath.name}
        </h2>
        <p className="text-sm font-medium text-neutral-400">
          {learningPath.description}
        </p>
      </Card.Body>
      <Card.Footer>
        <Button
          variant="primary"
          asLink
          href={getUrlFor(PermalinkResources.LearningPath, [learningPath.slug])}
          className="w-full"
        >
          Learn
        </Button>
      </Card.Footer>
    </Card>
  );
}

interface LearningPathListProps {
  learningPaths: ILearningPath[];
}

export default function LearningPathList({
  learningPaths,
}: LearningPathListProps) {
  return (
    <div className="grid grid-cols-4">
      {learningPaths.map((learningPaths) => (
        <SingleLearningPath
          key={learningPaths.slug}
          learningPath={learningPaths}
        />
      ))}
    </div>
  );
}
