import Container from '@/components/Container';
import { ILearningPath } from '@/types';
import { getAllLearningPaths, getLearningPath } from '@/utils/tutorial';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface StaticPathsQuery extends ParsedUrlQuery {
  slug: string;
}

interface PageProps {
  slug: string;
  learningPath: ILearningPath;
}

export default function Page({ slug, learningPath }: PageProps) {
  return <Container className="mx-auto max-w-6xl">{JSON.stringify(learningPath)}</Container>;
}

export const getStaticPaths: GetStaticPaths<StaticPathsQuery> = async () => {
  const allLearningPaths = await getAllLearningPaths();

  return {
    paths: [
      ...allLearningPaths.map((slug) => ({
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
  const learningPath = await getLearningPath(context.params?.slug as string);

  return {
    props: {
      slug: context.params?.slug as string,
      learningPath,
    },
  };
};
