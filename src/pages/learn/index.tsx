import Container from '@/components/Container';
import List from '@/components/ui/List';
import { ITutorial } from '@/types';
import { PGT } from '@/utils/pgt/pgt.types';
import { getAllTutorials, getTutorial } from '@/utils/tutorial';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface PageProps {
  tutorials: ITutorial[];
}

export default function Page({ tutorials }: PageProps) {
  const listItems = tutorials.map((tutorial) => ({
    title: tutorial.name,
    description: tutorial.description,
    href: `/learn/${tutorial.slug}`,
  }));

  return (
    <>
      <Head>
        <title>All Lessons | LeetChess</title>
        <meta
          name="description"
          content="Get ready to dominate the chess board with LeetChess's interactive lessons. Perfect for beginners and advanced players alike."
        />
      </Head>
      <Container className="space-y-4">
        <h1 className="text-center text-4xl font-medium">All Lessons</h1>
        <p className="text-center text-2xl">
          Get ready to dominate the chess board with LeetChess&apos;s interactive lessons. Perfect for beginners and
          advanced players alike.
        </p>
        <h2 className="text-2xl font-medium">Lessons</h2>
        <List items={listItems} />
      </Container>
    </>
  );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
  const allTutorials = await getAllTutorials();
  const data = await Promise.all(allTutorials.map((slug) => getTutorial(slug)));

  // We are removing PGT data because this page is only for listing purposes.
  // Including PGT content in this page would increase the page size and slow down the page load.
  const cleanedData = data.map((data) => ({
    ...data,
    pgt: {} as PGT,
  }));

  return {
    props: {
      tutorials: cleanedData,
    },
  };
};
