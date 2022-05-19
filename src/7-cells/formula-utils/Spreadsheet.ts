interface Cell {
  value: string;
  calculatedValue: string;
}

export class Spreadsheet {
  private _cells: string[][];

  constructor() {
    this._cells = this._createEmptyCells();
  }

  getCells(): string[][] {
    return this._cells;
  }

  updateCell(cellName: string): void {}

  private _createEmptyCells() {
    const result = [];
    for (let x = 0; x < 99; x++) {
      let row = [];
      for (let y = 0; y < 26; y++) {
        row.push("");
      }
      result.push(row);
    }
    return result;
  }

  private _getCellByName(cellName: string) {}
}
