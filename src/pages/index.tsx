import Tutorial from "@/components/Tutorial";

export default function Home() {
  const testTutorial: IChessTutorial = {
    id: 0,
    name: "Protect Your Pieces",
    subtitle: "Don't let your pieces get captured",
    steps: [
      {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        comment: [
          {
            type: "text",
            value:
              "Protection is a basic and very important concept in chess. What does it mean when we say a piece is protected?",
          },
          {
            type: "text",
            value:
              "It simply means that, if our opponent captures one of our pieces, then we can capture our opponent's piece in return.",
          },
          {
            type: "variant",
            value: {
              fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
              moves: [
                {
                  from: "e2",
                  to: "e4",
                },
                {
                  from: "e7",
                  to: "e5",
                },
                {
                  from: "g1",
                  to: "f3",
                },
                {
                  from: "b8",
                  to: "c6",
                },
              ],
            },
          },
        ],
      },
      {
        fen: "r2q1rk1/bpp2ppp/p1npbn2/4p3/P1B1P3/2PP1N1P/1P1N1PP1/R1BQ1RK1 w Qq - 0 1",
        comment: [
          {
            type: "text",
            value:
              "In this position, white to move can capture black's bishop.",
          },
        ],
        move: {
          from: "c4",
          to: "e6",
        },
      },
      {
        fen: "r2q1rk1/bpp2ppp/p1npBn2/4p3/P3P3/2PP1N1P/1P1N1PP1/R1BQ1RK1 b Qq - 0 1",
        comment: [
          {
            type: "text",
            value:
              "However, black's bishop is protected by the pawn on f7, so black can capture white's bishop in return.",
          },
        ],
        move: {
          from: "f7",
          to: "e6",
        },
        autoPlay: true,
      },
      {
        fen: "r2q1rk1/bpp3pp/p1nppn2/4p3/P3P3/2PP1N1P/1P1N1PP1/R1BQ1RK1 w Qq - 0 1",
        comment: [
          {
            type: "text",
            value:
              "Both players have lost a bishop, so material is still equal.",
          },
        ],
      },
      {
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
        comment: [
          {
            type: "text",
            value:
              "When one player captures a piece, and the second player captures one in reply, this is called an exchange.",
          },
          {
            type: "text",
            value:
              "Exchanges (also known as trading or swapping pieces) are an important part of chess strategy, and will have their own detailed tutorials later on. For now, all you need to know is that when you exchange pieces, you should make sure that the piece you capture is at least equal in value to the piece your opponent captured.",
          },
        ],
      },
      {
        fen: "r3r1k1/p1p2pp1/bp3b1p/8/5P2/1BP2N2/PP4PP/3R1RK1 b - - 0 1",
        comment: [
          {
            type: "text",
            value: "In this position, black can capture white's rook",
          },
        ],
        move: {
          from: "a6",
          to: "f1",
        },
      },
      {
        fen: "r3r1k1/p1p2pp1/1p3b1p/8/5P2/1BP2N2/PP4PP/3R1bK1 w - - 0 1",
        comment: [
          {
            type: "text",
            value:
              "The rook was protected by white's king, so white can capture the black bishop.",
          },
        ],
        move: {
          from: "g1",
          to: "f1",
        },
        autoPlay: true,
      },
      {
        fen: "r3r1k1/p1p2pp1/1p3b1p/8/5P2/1BP2N2/PP4PP/3R1K2 w - - 0 1",
        comment: [
          {
            type: "text",
            value:
              "However, a rook is worth five points and a bishop only three, so black has come out ahead. In this situation, we would say that black has won the exchange, or that white has lost the exchange.",
          },
        ],
      },
    ],
  };

  return (
    <div className="mx-auto max-w-6xl">
      <Tutorial data={testTutorial} />
    </div>
  );
}
