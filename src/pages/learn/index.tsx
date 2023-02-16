import Container from "@/components/Container";
import TutorialList from "@/components/TutorialList";
import { getAllTutorials, getTutorialMeta } from "@/utils/tutorial";
import { GetStaticProps } from "next";

interface PageProps {
  tutorials: IChessTutorialMeta[];
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
  const metas = await Promise.all(allTutorials.map(getTutorialMeta));

  return {
    props: {
      tutorials: metas,
    },
  };
};
