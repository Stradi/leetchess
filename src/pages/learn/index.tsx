import Container from '@/components/Container';
import List from '@/components/ui/List';
import { ITutorial } from '@/types';
import { PGT } from '@/utils/pgt/pgt.types';
import { getAllTutorials, getTutorial } from '@/utils/tutorial';
import { GetStaticProps } from 'next';

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
    <Container>
      <List items={listItems} />
    </Container>
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
