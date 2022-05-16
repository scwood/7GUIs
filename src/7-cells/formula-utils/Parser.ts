import { Token, TokenType, MathTokenType } from "./Lexer";

export interface Ast {
  expression: ExpressionNode;
}

export type ExpressionNode = NumberNode | CellNode | MathNode;

export interface NumberNode extends Node {
  type: NodeType.Number;
  value: number;
}

export interface CellNode extends Node {
  type: NodeType.Cell;
  cell: string;
}

export interface MathNode extends Node {
  type: NodeType.Math;
  operatorTokenType: MathTokenType;
  left: ExpressionNode;
  right: ExpressionNode;
}

export interface Node {
  type: NodeType;
}

export enum NodeType {
  Number = "number",
  Math = "math",
  Cell = "cell",
}

export class Parser {
  private _tokens: Token[];
  private _position: number;
  private _token: Token | null;

  constructor(tokens: Token[]) {
    this._tokens = tokens;
    this._token = null;
    this._position = -1;
    this._readToken();
  }

  parse(): Ast {
    const expression = this._parseExpression();
    if (this._token !== null) {
      throw new Error("Parse error, too many tokens");
    }
    return { expression };
  }

  private _parseExpression(): ExpressionNode {
    switch (this._token?.type) {
      case TokenType.Number:
        return this._parseNumber();
      case TokenType.Cell:
        return this._parseCell();
      case TokenType.Add:
      case TokenType.Subtract:
      case TokenType.Multiply:
      case TokenType.Divide:
        return this._parseMath();
      default:
        throw new Error("Parse error, expected expression");
    }
  }

  private _parseNumber(): NumberNode {
    if (this._token?.type !== TokenType.Number) {
      throw new Error("Parse error, expected number");
    }
    const node: NumberNode = {
      type: NodeType.Number,
      value: parseFloat(this._token.text),
    };
    this._readToken();
    return node;
  }

  private _parseCell(): CellNode {
    if (this._token?.type !== TokenType.Cell) {
      throw new Error("Parse error, expected cell");
    }
    const node: CellNode = { type: NodeType.Cell, cell: this._token.text };
    this._readToken();
    return node;
  }

  private _parseMath(): MathNode {
    const operatorTokenType = this._token?.type;
    if (
      operatorTokenType !== TokenType.Add &&
      operatorTokenType !== TokenType.Subtract &&
      operatorTokenType !== TokenType.Multiply &&
      operatorTokenType !== TokenType.Divide
    ) {
      throw new Error("Parse error, expected math operator");
    }
    this._readToken();
    this._parseLeftBracket();
    const left = this._parseExpression();
    this._parseComma();
    const right = this._parseExpression();
    this._parseRightBracket();
    return { type: NodeType.Math, left, right, operatorTokenType };
  }

  private _parseLeftBracket() {
    if (this._token?.type !== TokenType.LeftBracket) {
      throw new Error("Parse error, expected (");
    }
    this._readToken();
  }

  private _parseRightBracket() {
    if (this._token?.type !== TokenType.RightBracket) {
      throw new Error("Parse error, expected )");
    }
    this._readToken();
  }

  private _parseComma() {
    if (this._token?.type !== TokenType.Comma) {
      throw new Error("Parse error, expected ,");
    }
    this._readToken();
  }

  private _readToken() {
    this._position++;
    this._token = this._tokens[this._position] || null;
  }
}
