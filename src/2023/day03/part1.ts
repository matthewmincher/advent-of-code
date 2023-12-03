import { parseInput } from "../../util";

class Coordinate {
  row: number;
  col: number;

  constructor(row: number, col: number) {
    this.row = row;
    this.col = col;
  }

  neighbours(row: number, col: number): boolean {
    for (
      let y = Math.max(this.row - 1, 0);
      y <= Math.min(this.row + 1, gridSize.rows);
      y++
    ) {
      for (
        let x = Math.max(this.col - 1, 0);
        x <= Math.min(this.col + 1, gridSize.cols);
        x++
      ) {
        if (y === row && x === col) {
          return true;
        }
      }
    }

    return false;
  }
}

const input = parseInput<string>({
  split: {
    mapper: false,
  },
});

const gridSize = {
  rows: input.length,
  cols: input[0].length,
};

function main() {
  let symbolCoordinates: Coordinate[] = [];

  input.forEach((line, rowIndex) => {
    for (const symbol of line.matchAll(/([^0-9.\n])/g)) {
      symbolCoordinates.push(new Coordinate(rowIndex, symbol.index!));
    }
  });

  let adjacentIndexPaths: string[] = [];
  for (let y = 0; y <= gridSize.rows; y++) {
    for (let x = 0; x <= gridSize.cols; x++) {
      for (const coordinate of symbolCoordinates) {
        if (coordinate.neighbours(y, x)) {
          adjacentIndexPaths.push(`${y}.${x}`);
          break;
        }
      }
    }
  }

  return input.reduce((sum, line, rowIndex) => {
    for (const matchedNumber of line.matchAll(/(\d+)/g)) {
      let number = matchedNumber[0];

      for (
        let characterIndex = 0;
        characterIndex < number.length;
        characterIndex++
      ) {
        let path = `${rowIndex}.${matchedNumber.index! + characterIndex}`;

        if (adjacentIndexPaths.indexOf(path) !== -1) {
          sum += Number(number);

          break;
        }
      }
    }
    return sum;
  }, 0);
}

export default main();
