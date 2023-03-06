{
  function flatten(array, accumulator = []) {
    for(var i = 0; i < array.length; i++) {
      if(Array.isArray(array[i])) {
        flatten(array[i], accumulator);
      } else {
        accumulator.push(array[i]);
      }
    }
    return accumulator;
  }

  function toMove(data) {
    const move = {};
    if(data.move_number) { move.moveNumber = data.move_number }
    if(data.half_move) { move.move = data.half_move }
    if(data.nags && data.nags.length) { move.nags = data.nags }
    if(data.ravs && data.ravs.length) { move.ravs = data.ravs }
    if(data.comments) { move.comments = data.comments }

    return move;
  }

  function toGame(data) {
    const game = {};
    return {
      introComments: data.intro_comments,
      headers: data.headers,
      comments: data.comments,
      moves: data.moves,
      result: data.result
    }
  }
  function toCommandArguments(args) {
    return args.map(function(arg) {
      if(arg[0] === ';' || arg[0] === null) {
        return arg.slice(1);
      } else {
        return arg;
      }
    }).flat()
  }
}

start = games:(GAME LINE_FEED*)*
  EOF
  { return games.map(function(game) { return game[0] }) }

EOF = !.
DOUBLE_QUOTE = '"'
STRING = DOUBLE_QUOTE text:[^"]* DOUBLE_QUOTE { return text.join('') }
INTEGER = a:[1-9] b:[0-9]* { return parseInt(a + b.join(''), 10) }
SYMBOL = chars:[A-Za-z0-9_-]+ {return chars.join('')}
COMMAND_SYMBOL = chars:[A-Za-z0-9._-]+ { return chars.join('') }
BLANK = ' '
TAB = "\t"
FORM_FEED = "\f"
LINE_FEED = "\n"
CARRIAGE_RETURN = "\r"
NEW_LINE = LINE_FEED
WS = BLANK / FORM_FEED / TAB / CARRIAGE_RETURN
WHITESPACE = WS / NEW_LINE

HEADER = '[' name:SYMBOL WS+ value:STRING ']' WHITESPACE* { return { name, value } }
HEADERS = headers:HEADER+ { return headers }

PIECE = [NKQRB]
RANK = [a-h-]
FILE = [1-8-]
CHECK = "+"
MATE = "#"
CAPTURE = "x"
PERIOD = "."
RESULT = "1-0" / "0-1" / "*" / "1/2-1/2"
MOVE_NUMBER = number:INTEGER PERIOD? (PERIOD PERIOD)? { return number }
SQUARE = rank:RANK file:FILE { return rank + file }
PROMOTION = "="? [QRBN]
NAG = chars:("$" INTEGER) { return chars.join('') }
CONTINUATION = PERIOD PERIOD PERIOD
DISAMBIGUATION = (RANK FILE) / RANK / FILE

COMMENT_MULTILINE_CHARS = [^}]
COMMENT_MULTILINE = '{' text:COMMENT_MULTILINE_CHARS* '}' { return { text: text.join('')} }

COMMENT_SINGLELINE_CHARS = [^\n]
COMMENT_SINGLELINE = ';' text:COMMENT_SINGLELINE_CHARS* { return { text: text.join('')} }

COMMAND = '[%' name:SYMBOL WHITESPACE args:(';'? COMMAND_SYMBOL)* ']' { return { name, args: toCommandArguments(args) } }
COMMAND_MULTIPLE = commands:COMMAND+ { return { command: commands } }
COMMENT_COMMAND = '{' command:COMMAND_MULTIPLE BLANK? comment:COMMENT_MULTILINE_CHARS* '}' { return { text: comment.join(''), command: command.command } }

COMMENT =
  comment:(COMMENT_COMMAND / COMMENT_MULTILINE / COMMENT_SINGLELINE)
  { return { text: comment.text, commands: comment.command ?? null } }
  
COMMENTS = (WHITESPACE* comment:COMMENT { return comment })+

RAV =
  '('
  WHITESPACE*
  comment:COMMENTS*
  WHITESPACE*
  moves:MOVETEXT
  WHITESPACE*
  result:RESULT?
  WHITESPACE*
  ')' { return { comments: flatten(comment), moves, result } }

PAWN_HALF_MOVE = (rank:RANK capture:CAPTURE)? SQUARE PROMOTION?
PIECE_HALF_MOVE = PIECE CAPTURE? SQUARE
PIECE_DISAMBIGUATION_HALF_MOVE = PIECE DISAMBIGUATION CAPTURE? SQUARE
CASTLE_HALF_MOVE = ("O-O-O" / "O-O")

HALF_MOVE = 
  move:(
    CONTINUATION?
    (PAWN_HALF_MOVE / PIECE_HALF_MOVE / PIECE_DISAMBIGUATION_HALF_MOVE / CASTLE_HALF_MOVE)
    (CHECK / MATE)?
    NAG?
  )
  { return flatten(move).join('') }

MOVE = 
  move_number:MOVE_NUMBER?
  WHITESPACE*
  half_move:HALF_MOVE
  nags:(WHITESPACE+ n:NAG { return n })*
  comments:(WHITESPACE+ c:COMMENT { return c })*
  ravs:(WHITESPACE* r:RAV { return r })*
  { return toMove({ move_number, half_move, nags, ravs, comments }) }

MOVETEXT =
  first:MOVE
  rest:(WHITESPACE* MOVE)*
  { return first ? [first].concat(rest.map(function(m) { return m[1] })) : [] }

GAME =
  WHITESPACE*
  intro_comments:COMMENTS?
  WHITESPACE*
  headers:HEADERS?
  comments:COMMENTS?
  WHITESPACE*
  moves:(move:MOVETEXT WHITESPACE+ result:RESULT { return [move, result] } / result:RESULT { return [null, result] })
  WHITESPACE*
  { return toGame({ intro_comments, headers, comments, moves: moves[0], result: moves[1] }) }
