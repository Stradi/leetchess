import { parse as _parse } from './internal';

// TODO: We should probably create a new Chess instance and play the moves.
// This would allow us to validate the moves and also to get the FEN. We
// could also use this to get the move number and the move SAN.
export async function parse(contents: string) {
  const games = _parse(contents) as any[];

  const beautifiedGames = games.map((game) => {
    const final: IPgn = {
      ...game,
    } as IPgn;

    final.headers = game.headers.reduce((acc: Record<string, string>, header: { name: string; value: string }) => {
      acc[header.name] = header.value;
      return acc;
    }, {});

    return final;
  });

  return beautifiedGames;
}
