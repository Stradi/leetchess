import Container from '@/components/Container';
import List from '@/components/ui/List';
import { ILearningPath } from '@/types';
import { getAllLearningPaths } from '@/utils/tutorial';
import { GetStaticProps } from 'next';

interface PageProps {
  learningPaths: ILearningPath[];
}

export default function Page({ learningPaths }: PageProps) {
  const listItems = learningPaths.map((learningPath) => ({
    title: learningPath.name,
    description: learningPath.description,
    href: `/learning-paths/${learningPath.slug}`,
  }));

  return (
    <Container className="space-y-4">
      <h1 className="text-center text-4xl font-medium">Learning Paths</h1>
      <p className="text-center text-2xl">
        We grouped the lessons into learning paths to help you learn chess in a structured way.
      </p>
      <h2 className="text-2xl font-medium">Learning Paths</h2>
      <List items={listItems} />
    </Container>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const allLearningPaths = await getAllLearningPaths();

  return {
    props: {
      learningPaths: allLearningPaths,
    },
  };
};
