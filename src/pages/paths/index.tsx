import Container from '@/components/Container';
import LearningPathList from '@/components/LearningPathList';
import { ILearningPath } from '@/types';
import { getAllLearningPaths, getLearningPath } from '@/utils/tutorial';
import { GetStaticProps } from 'next';

interface PageProps {
  learningPaths: ILearningPath[];
}

export default function Page({ learningPaths }: PageProps) {
  return (
    <Container>
      <LearningPathList learningPaths={learningPaths} />
    </Container>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const allLearningPaths = await getAllLearningPaths();
  const fullPaths = await Promise.all(allLearningPaths.map(getLearningPath));

  return {
    props: {
      learningPaths: fullPaths,
    },
  };
};
