import Container from '@/components/Container';
import List from '@/components/ui/List';
import { ILearningPath, ITutorial } from '@/types';
import { getAllLearningPaths, getLearningPath } from '@/utils/tutorial';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

interface StaticPathsQuery extends ParsedUrlQuery {
  slug: string;
}

interface PageProps {
  learningPath: ILearningPath;
}

export default function Page({ learningPath }: PageProps) {
  const listItems = (learningPath.lessons as ITutorial[]).map((tutorial) => ({
    title: tutorial.name,
    description: tutorial.description,
    href: `/learn/${tutorial.slug}`,
  }));

  return (
    <>
      <Head>
        <title>{learningPath.name} | LeetChess</title>
        <meta name="description" content={learningPath.description} />
      </Head>
      <Container className="space-y-4">
        <h1 className="text-center text-4xl font-medium">{learningPath.name}</h1>
        <p className="text-center text-2xl">{learningPath.description}</p>
        <h2 className="text-2xl font-medium">Lessons</h2>
        <List items={listItems} />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<StaticPathsQuery> = async () => {
  const allLearningPaths = await getAllLearningPaths();

  return {
    paths: [
      ...allLearningPaths.map((path) => ({
        params: {
          slug: path.slug,
        },
      })),
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, StaticPathsQuery> = async (
  context: GetStaticPropsContext<StaticPathsQuery>
) => {
  const learningPath = await getLearningPath(context.params?.slug as string, true);

  return {
    props: {
      learningPath,
    },
  };
};
