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
    <Container>
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
