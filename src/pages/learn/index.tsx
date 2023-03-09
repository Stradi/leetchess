import Container from '@/components/Container';
import TutorialList from '@/components/TutorialList';
import { ITutorial } from '@/types';
import { getAllTutorials, getTutorial } from '@/utils/tutorial';
import { GetStaticProps } from 'next';

interface PageProps {
  tutorials: ITutorial[];
}

export default function Page({ tutorials }: PageProps) {
  return (
    <Container>
      <TutorialList tutorials={tutorials} />
    </Container>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const allTutorials = await getAllTutorials();
  const data = await Promise.all(allTutorials.map((slug) => getTutorial(slug)));

  return {
    props: {
      tutorials: data,
    },
  };
};
