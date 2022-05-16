export interface Token {
  type: TokenType;
  text: string;
}

export enum TokenType {
  Add = "add",
  Subtract = "subtract",
  Multiply = "multiply",
  Divide = "divide",
  Cell = "cell",
  Number = "number",
  LeftBracket = "leftBracket",
  RightBracket = "rightRacket",
  Comma = "comma",
}

export type MathTokenType =
  | TokenType.Add
  | TokenType.Subtract
  | TokenType.Multiply
  | TokenType.Divide;

const reservedKeywords: { [keyword: string]: TokenType } = {
  ADD: TokenType.Add,
  SUBTRACT: TokenType.Subtract,
  MULTIPLY: TokenType.Multiply,
  DIVIDE: TokenType.Divide,
};

const reservedSymbols: { [symbol: string]: TokenType } = {
  "(": TokenType.LeftBracket,
  ")": TokenType.RightBracket,
  ",": TokenType.Comma,
};

export class Lexer {
  private _position: number;
  private _input: string;
  private _char: string | null;
  private _tokens: Token[];

  constructor(input: string) {
    this._position = -1;
    this._input = input;
    this._char = null;
    this._tokens = [];
    this._readChar();
  }

  lex(): Token[] {
    while (this._char !== null) {
      if (isWhiteSpace(this._char)) {
        this._readChar();
      } else if (this._char in reservedSymbols) {
        this._tokens.push({
          type: reservedSymbols[this._char] as TokenType,
          text: this._char,
        });
        this._readChar();
      } else if (isCapitalLetter(this._char)) {
        this._readIdentifier();
      } else if (isDigit(this._char) || isPeriod(this._char)) {
        this._readNumber();
      } else {
        throw new Error(
          `Unknown character "${this._char}" near position ${this._position}`
        );
      }
    }
    return this._tokens;
  }

  private _readChar() {
    this._position++;
    this._char =
      this._position < this._input.length
        ? this._input.charAt(this._position)
        : null;
  }

  private _readIdentifier() {
    let identifier = "";
    while (
      this._char !== null &&
      (isCapitalLetter(this._char) || isDigit(this._char))
    ) {
      identifier += this._char;
      this._readChar();
    }
    if (identifier in reservedKeywords) {
      this._tokens.push({
        type: reservedKeywords[identifier] as TokenType,
        text: identifier,
      });
    } else if (isCell(identifier)) {
      this._tokens.push({ type: TokenType.Cell, text: identifier });
    } else {
      throw new Error(
        `Invalid identifier ${identifier} near position ${this._position}`
      );
    }
  }

  private _readNumber() {
    let decimalCount = 0;
    let numberString = "";
    while (
      this._char !== null &&
      (isDigit(this._char) || isPeriod(this._char))
    ) {
      numberString += this._char;
      if (isPeriod(this._char)) {
        decimalCount++;
      }
      if (decimalCount > 1) {
        throw new Error(
          `Invalid number ${numberString} near position ${this._position}`
        );
      }
      this._readChar();
    }
    this._tokens.push({ type: TokenType.Number, text: numberString });
  }
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

function isCell(s: string) {
  return /^[A-Z][0-99]$/.test(s);
}

function isPeriod(s: string) {
  return s === ".";
}
