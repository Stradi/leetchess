{
	function flatten(array, accumulator = []) {
    	for(let i = 0; i < array.length; i++) {
        	if(Array.isArray(array[i])) {
            	flatten(array[i], accumulator);
            } else {
            	accumulator.push(array[i]);
            }
        }
        
        return accumulator;
    }
    
	function toHeader(key, value) {
    	return {
        	key: key.join(''),
            value
        }
    }
    
    function toComment(content, commands) {
    	if(commands.length > 0) {
        	return {
            	type: 'COMMENT',
                value: {
                	text: content.join(''),
                    commands: commands.map((command) => ({ name: command.value.name, args: command.value.args }))
                }
            }
        } else {    
    		return {
        		type: 'COMMENT',
            	value: {
                	text: content.join(''),
                    commands: []
                }
        	}
        }
    }
    
    function toCommand(name, args) {
    	const filteredArgs = args.map(arg => {
        	if(arg[0] === ';' || arg[0] === null) {
            	return arg.slice(1);
            } else {
            	return arg;
            }
        }).flat();
    
    	return {
        	type: 'COMMAND',
            value: {
            	name,
                args: filteredArgs
            }
		}
    }
    
    function toMove(autoplay, halfMove, nags, contents) {
        const flatContents = contents.flat().filter(content => content);
        let commands = [];
        let comments = [];
        if(flatContents[0] !== null) {
			commands = flatContents.filter(content => content.type === 'COMMAND');
        	comments = flatContents.filter(content => content.type === 'COMMENT');		
        }
    
    	return {
        	type: 'MOVE',
            value: {
        		autoplay: autoplay === null ? true : false,
                moveSan: halfMove,
                nags,
            	comments: [...comments, ...commands]
        	}
        }
    }
}

PGT = headers:MultiHeader steps:Step* { return { headers, steps } }

EOF = !.
Symbol = [A-Za-z]
String = '"' str:[^"]* '"' { return str.join('') }
Integer = a:[1-9] b:[0-9]* { return parseInt(a + b.join(''), 10) }
Space = ' '
MultiSpace = Space*
OptionalSpace = MultiSpace?

Newline = '\n'
MultiNewline = Newline*
OptionalNewline = MultiNewline?

Piece = [NKQRB] 
Rank = [a-h-]
File = [1-8-]
Check = '+'
Mate = '#'
Capture = 'x'
Promotion = '='? [QRBN]
Square = rank:Rank file:File { return rank + file }
Nag = chars:('$' Integer) { return chars.join('') }
Disambiguation = (Rank File) / Rank / File

Header = '[' OptionalSpace key:Symbol* OptionalSpace value:String OptionalSpace ']' OptionalSpace OptionalNewline { return toHeader(key, value) }
MultiHeader = Header*

CommandName = text:[A-Za-z0-9_-]+ { return text.join('') }
CommandArgSymbol = text:[A-Za-z0-9._-]+ { return text.join('') }
Command = '{[%' name:CommandName OptionalSpace args:(';'? CommandArgSymbol)* ']}' OptionalSpace { return toCommand(name, args) }
MultiCommand = Command*

CommentContent = [^\}]
Comment = OptionalSpace '{' content:CommentContent* '}' OptionalSpace commands:MultiCommand? { return toComment(content, commands) }

PawnHalfMove = (rank:Rank capture:Capture)? Square Promotion?
PieceHalfMove = Piece Capture? Square
PieceDisambiguationHalfMove = Piece Disambiguation Capture? Square
CastleHalfMove = ('O-O-O' / 'O-O')
HalfMove = move:((PawnHalfMove / PieceHalfMove / PieceDisambiguationHalfMove / CastleHalfMove) (Check / Mate)? Nag?) { return flatten(move).join('') }
Move = autoplay:'!'? OptionalSpace? halfMove:HalfMove nags:(OptionalSpace n:Nag { return n })* OptionalSpace contents:(MultiCommand? Comment?)? { return toMove(autoplay, halfMove, nags, contents) }

Step = data:(Command / Comment / Move) (Newline+ / EOF) { return data }
MultiStep = steps:Step*
