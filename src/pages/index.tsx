import Tutorial from "@/components/Tutorial";

export default function Home() {
  const testTutorial: IChessTutorial = {
    id: 0,
    name: "Test Tutorial",
    subtitle: "This is a test tutorial",
    steps: [
      {
        fen: "rnbqkbnr/8/1p1p1p1p/p1p1p1p1/P1P1P1P1/1P1P1P1P/8/RNBQKBNR w KQkq - 0 1",
        text: "Welcome to the tutorial!",
      },
      {
        fen: "rnbqkbnr/8/1p1p1p1p/p1p1p1p1/P1P1PPP1/1P1P3P/8/RNBQKBNR w KQkq - 0 1",
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
        fen: "rnbqkbnr/8/1p1p1p1p/p1p3p1/P1P1PpP1/1P1P3P/8/RNBQKBNR w KQkq - 0 1",
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
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
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
        fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
        move: {
          from: "e7",
          to: "e5",
        },
        autoPlay: true,
      },
      {
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1",
        text: "Black's most common response to the e4 opening is to move the pawn from e7 to e5.",
      },
      {
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1",
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
        fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 0 1",
        move: {
          from: "b8",
          to: "c6",
        },
        autoPlay: true,
      },
      {
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1",
        text: "Black develops too.",
      },
      {
        fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1",
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
