import Tutorial from "@/components/Tutorial";

export default function Home() {
  const testTutorial: IChessTutorial = {
    id: 0,
    name: "Test Tutorial",
    subtitle: "This is a test tutorial",
    startingFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    steps: [
      {
        text: "Welcome to the tutorial!",
      },
      {
        text: "This is a test tutorial. And here are some shapes..",
        highlights: [
          {
            from: "c4",
            to: "h8",
            color: "yellow",
          },
          {
            from: "a6",
          },
        ],
      },
      {
        text: "Here comes the first move.",
        highlights: [
          {
            from: "e1",
            to: "e8",
            color: "red",
          },
          {
            from: "a1",
            to: "h8",
            color: "blue",
          },
        ],
      },
      {
        text: "First move is to move the pawn from e2 to e4.",
        move: {
          from: "e2",
          to: "e4",
        },
        hints: [
          {
            highlight: {
              from: "e2",
            },
            text: "This is a hint",
          },
          {
            highlight: {
              from: "e2",
              to: "e4",
            },
            text: "This is full hint",
          },
        ],
      },
      {
        move: {
          from: "e7",
          to: "e5",
        },
        autoPlay: true,
      },
      {
        text: "Black's most common response to the e4 opening is to move the pawn from e7 to e5.",
      },
      {
        text: "Now we have to develop, right?",
        move: {
          from: "g1",
          to: "f3",
        },
        hints: [
          {
            highlight: { from: "g1" },
          },
          {
            highlight: {
              from: "g1",
              to: "f3",
            },
          },
        ],
      },
      {
        move: {
          from: "b8",
          to: "c6",
        },
        autoPlay: true,
      },
      {
        text: "Black develops too.",
      },
      {
        text: "Tutorial is done!",
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Tutorial data={testTutorial} />
    </div>
  );
}
