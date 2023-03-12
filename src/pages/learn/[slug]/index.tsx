import Container from '@/components/Container';
import Tutorial from '@/components/Tutorial/';
import { ITutorial } from '@/types';
import { getAllTutorials, getTutorial } from '@/utils/tutorial';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';

interface StaticPathsQuery extends ParsedUrlQuery {
  slug: string;
}

interface PageProps {
  tutorial: ITutorial;
}

export default function Page({ tutorial }: PageProps) {
  return (
    <>
      <Head>
        <title>{tutorial.name} | LeetChess</title>
        <meta name="description" content={tutorial.description} />
      </Head>
      <Container>
        <Tutorial data={tutorial} />
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<StaticPathsQuery> = async () => {
  const allTutorials = await getAllTutorials();

  return {
    paths: [
      ...allTutorials.map((slug) => ({
        params: {
          slug,
        },
      })),
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps, StaticPathsQuery> = async (
  context: GetStaticPropsContext<StaticPathsQuery>
) => {
  const tutorial = await getTutorial(context.params?.slug as string);

  return {
    props: {
      key: tutorial.slug,
      tutorial,
    },
  };
};
