import Container from '@/components/Container';
import List from '@/components/ui/List';
import { IBlogPost, ITutorial } from '@/types';
import { getAllPosts, getPost } from '@/utils/blog';
import { PGT } from '@/utils/pgt/pgt.types';
import { getAllTutorials, getTutorial } from '@/utils/tutorial';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface PageProps {
  posts: IBlogPost[];
}

export default function Page({ posts }: PageProps) {
  const listItems = posts.map((post) => ({
    title: post.name,
    description: post.description,
    href: `/blog/${post.slug}`,
  }));

  return (
    <>
      <Head>
        <title>All Articles | LeetChess</title>
        <meta
          name="description"
          content="All articles written by LeetChess. Answers to common questions, tips and tricks, and more."
        />
      </Head>
      <Container className="space-y-4">
        <h1 className="text-center text-4xl font-medium">All Lessons</h1>
        <p className="text-center text-2xl">
          All articles written by LeetChess. Answers to common questions, tips and tricks, and more.
        </p>
        <h2 className="text-2xl font-medium">Articles</h2>
        <List items={listItems} />
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const allPosts = await getAllPosts();
  const data = await Promise.all(allPosts.map((slug) => getPost(slug)));

  return {
    props: {
      posts: data,
    },
  };
};
