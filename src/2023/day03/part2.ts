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

class CoordinateGroup {
  value: number;
  members: Coordinate[];

  constructor(value: number, members: Coordinate[]) {
    this.value = value;
    this.members = members;
  }

  neighbors(row: number, col: number): boolean {
    return (
      this.members.filter((coordinate) => coordinate.neighbours(row, col))
        .length !== 0
    );
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
  let partNumberGroups: CoordinateGroup[] = [];

  input.forEach((line, rowIndex) => {
    for (const partNumber of line.matchAll(/([0-9]+)/g)) {
      let members: Coordinate[] = [];
      let value = partNumber[0];

      for (
        let characterIndex = 0;
        characterIndex < value.length;
        characterIndex++
      ) {
        members.push(
          new Coordinate(rowIndex, partNumber.index! + characterIndex)
        );
      }

      partNumberGroups.push(
        new CoordinateGroup(Number(partNumber[0]), members)
      );
    }
  });

  return input.reduce((sum, line, rowIndex) => {
    for (const matchedGear of line.matchAll(/(\*)/g)) {
      let neighboringGroups = partNumberGroups.filter((group) =>
        group.neighbors(rowIndex, matchedGear.index!)
      );

      if (neighboringGroups.length < 2) {
        continue;
      }

      sum += neighboringGroups.reduce((ratio, neighboringGroup) => {
        return ratio * neighboringGroup.value;
      }, 1);
    }

    return sum;
  }, 0);
}

export default main();
