import Container from '@/components/Container';
import List from '@/components/ui/List';
import { ILearningPath } from '@/types';
import { getAllLearningPaths } from '@/utils/tutorial';
import { GetStaticProps } from 'next';
import Head from 'next/head';

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
    <>
      <Head>
        <title>Learning Paths | LeetChess</title>
        <meta
          name="description"
          content="Follow LeetChess's expertly crafted learning paths to become a chess master. Our learning paths will take you from beginner to advanced levels."
        />
      </Head>
      <Container className="space-y-4">
        <h1 className="text-center text-4xl font-medium">Learning Paths</h1>
        <p className="text-center text-2xl">
          Follow LeetChess&apos;s expertly crafted learning paths to become a chess master. Our learning paths will take
          you from beginner to advanced levels.
        </p>
        <h2 className="text-2xl font-medium">Learning Paths</h2>
        <List items={listItems} />
      </Container>
    </>
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
