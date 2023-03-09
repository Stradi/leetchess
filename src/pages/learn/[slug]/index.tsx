import Container from '@/components/Container';
import Tutorial from '@/components/Tutorial';
import { ITutorial } from '@/types';
import { PGT } from '@/utils/pgt/pgt.types';
import { getAllTutorials, getTutorial } from '@/utils/tutorial';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface StaticPathsQuery extends ParsedUrlQuery {
  slug: string;
}

interface PageProps {
  tutorial: ITutorial;
}

export default function Page({ tutorial }: PageProps) {
  return (
    <Container className="mx-auto max-w-6xl">
      <Tutorial data={tutorial} />
    </Container>
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
      tutorial,
    },
  };
};
