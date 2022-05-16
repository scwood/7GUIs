import { TokenType } from "./Lexer";
import {
  Ast,
  CellNode,
  ExpressionNode,
  MathNode,
  NodeType,
  NumberNode,
} from "./Parser";

export class Interpreter {
  interpret(ast: Ast) {
    return this._calculateExpression(ast.expression);
  }

  private _calculateExpression(node: ExpressionNode): number {
    switch (node.type) {
      case NodeType.Number:
        return this._calculateNumber(node);
      case NodeType.Cell:
        return this._calculateCell(node);
      case NodeType.Math:
        return this._calculateMath(node);
    }
  }

  private _calculateMath(node: MathNode) {
    const left = this._calculateExpression(node.left);
    const right = this._calculateExpression(node.right);
    switch (node.operatorTokenType) {
      case TokenType.Add:
        return left + right;
      case TokenType.Subtract:
        return left - right;
      case TokenType.Multiply:
        return left * right;
      case TokenType.Divide:
        return left / right;
    }
  }

  private _calculateNumber(node: NumberNode) {
    return node.value;
  }

  private _calculateCell(node: CellNode) {
    return 1;
  }
}
