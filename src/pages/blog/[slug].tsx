import Container from '@/components/Container';
import { IBlogPost } from '@/types';
import { getAllPosts, getPost } from '@/utils/blog';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { ParsedUrlQuery } from 'querystring';
import ReactMarkdown from 'react-markdown';

interface StaticPathsQuery extends ParsedUrlQuery {
  slug: string;
}

interface PageProps {
  post: IBlogPost;
}

export default function Page({ post }: PageProps) {
  return (
    <>
      <Head>
        <title>{post.name} | LeetChess</title>
        <meta name="description" content={post.description} />
      </Head>
      <Container>
        <ReactMarkdown className="prose prose-base prose-invert md:prose-lg">{post.contents}</ReactMarkdown>
      </Container>
    </>
  );
}

export const getStaticPaths: GetStaticPaths<StaticPathsQuery> = async () => {
  const allPosts = await getAllPosts();

  return {
    paths: [
      ...allPosts.map((slug) => ({
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
  const post = await getPost(context.params?.slug as string);

  return {
    props: {
      key: post.slug,
      post,
    },
  };
};
