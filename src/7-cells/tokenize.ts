/*

<expression>        -> <number> | <cell> | <math>
<cell>              -> <letter><number>
<math>              -> <operator> <left-bracket> <expression> <comma> <expression> <right-bracket>
<operator>          -> 'SUM' | 'MINUS' | 'MULTIPLY' | 'DIVIDE
<comma>             -> ','
<left-bracket>      -> '('
<right-bracket>     -> ')'

*/

enum TokenType {
  Sum,
  Minus,
  Multiply,
  Divide,
  Letter,
  Number,
  LeftBracket,
  RightBracket,
  Comma,
  Eof,
}

const reservedKeywords: { [keyword: string]: TokenType } = {
  SUM: TokenType.Sum,
  MINUS: TokenType.Minus,
  MULTIPLY: TokenType.Multiply,
  DIVIDE: TokenType.Divide,
};

const reservedSymbols: { [symbol: string]: TokenType } = {
  "(": TokenType.LeftBracket,
  ")": TokenType.RightBracket,
  ",": TokenType.Comma,
};

interface Token {
  type: TokenType;
  text: string;
}

export function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let currentPosition = 0;

  while (currentPosition < input.length) {
    const tokenStartPosition = currentPosition;
    let nextChar = input.charAt(currentPosition);

    if (isWhiteSpace(nextChar)) {
      currentPosition++;
    } else if (nextChar in reservedSymbols) {
      tokens.push({
        type: reservedSymbols[nextChar] as TokenType,
        text: nextChar,
      });
      currentPosition++;
    } else if (isCapitalLetter(nextChar)) {
      while (currentPosition < input.length && isCapitalLetter(nextChar)) {
        currentPosition++;
        nextChar = input.charAt(currentPosition);
      }
      const text = input.slice(tokenStartPosition, currentPosition);
      if (text in reservedKeywords) {
        tokens.push({ type: reservedKeywords[text] as TokenType, text });
      } else if (text.length === 1) {
        tokens.push({ type: TokenType.Letter, text });
      } else {
      }
    } else if (isDigit(nextChar) || nextChar === "-") {
      while (
        currentPosition < input.length &&
        (isDigit(nextChar) || nextChar === "-" || nextChar === ".")
      ) {
        currentPosition++;
        nextChar = input.charAt(currentPosition);
      }
      const text = input.slice(tokenStartPosition, currentPosition);
      if (isNumber(text)) {
        tokens.push({ type: TokenType.Number, text });
      } else {
        throw new Error(`Invalid number at position ${currentPosition}`);
      }
    } else {
      throw new Error(
        `Unknown character ${nextChar} at position ${currentPosition}`
      );
    }
  }
  tokens.push({ type: TokenType.Eof, text: "" });
  return tokens;
}

function isWhiteSpace(s: string) {
  return /\s/.test(s);
}

function isCapitalLetter(s: string) {
  return /[A-Z]/.test(s);
}

function isDigit(s: string) {
  return /[0-9]/.test(s);
}

function isNumber(s: string) {
  if (s.trim() === "") {
    return false;
  }
  return !Number.isNaN(Number(s));
}
