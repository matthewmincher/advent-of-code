import { parseInput } from "../../util";

const input = parseInput<string[]>({
  split: {
    mapper: (line) => {
      return line.split("");
    },
  },
});

function expandUniverse(universe: string[][]): [number[], number[]] {
  const transposedUniverse = universe[0].map((x, i) =>
    universe.map((x) => x[i])
  );

  const emptyColumnIndexes: number[] = [];
  const emptyRowIndexes: number[] = [];

  for (let row = 0; row < universe.length; row++) {
    if (universe[row].every((char) => char === ".")) {
      emptyRowIndexes.push(row);
    }
  }

  for (let col = 0; col < transposedUniverse.length; col++) {
    if (transposedUniverse[col].every((char) => char === ".")) {
      emptyColumnIndexes.push(col);
    }
  }

  return [emptyColumnIndexes, emptyRowIndexes];
}

class Galaxy {
  constructor(
    public row: number,
    public col: number,
    public index: number
  ) {}
}

function minimumDistance(
  sourceCol: number,
  sourceRow: number,
  destinationCol: number,
  destinationRow: number
): number {
  return (
    Math.abs(destinationCol - sourceCol) + Math.abs(destinationRow - sourceRow)
  );
}

function main() {
  const universe = input;
  const [emptyColumnIndexes, emptyRowIndexes] = expandUniverse(input);

  const galaxies: Galaxy[] = [];

  let i = 1;
  for (let rowIndex in universe) {
    for (let colIndex in universe[rowIndex]) {
      const char = universe[rowIndex][colIndex];

      if (char !== ".") {
        const row = Number(rowIndex);
        const col = Number(colIndex);

        let expandedRow =
          emptyRowIndexes.filter((index) => index < row).length *
          (1_000_000 - 1);
        let expandedCol =
          emptyColumnIndexes.filter((index) => index < col).length *
          (1_000_000 - 1);

        const galaxy = new Galaxy(row + expandedRow, col + expandedCol, i++);
        galaxies.push(galaxy);
      }
    }
  }

  const pairs = galaxies.flatMap((v, i) =>
    galaxies.slice(i + 1).map((w) => [v, w])
  );

  return pairs
    .map(([a, b]) => minimumDistance(a.col, a.row, b.col, b.row))
    .reduce((prev, curr) => {
      return prev + curr;
    });
}

export default main();
