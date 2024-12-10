import { parseInput } from "../../util";

const input = parseInput<number[]>({
  split: {
    delimiter: "\n",
    mapper: (l) => l.split("").map((c) => Number(c)),
  },
});

type PendingMovement = {
  row: number;
  col: number;
  height: number;
};

const TRANSFORM = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const isInBounds = (row: number, col: number) => {
  return row >= 0 && col >= 0 && row < input.length && col < input[0].length;
};

const isValidIncrease = (row: number, col: number, currentHeight: number) => {
  return input[row][col] === currentHeight + 1;
};

const startPositions = input
  .map((row, rowIndex) =>
    row.map((char, colIndex) => (char == 0 ? [rowIndex, colIndex] : null)),
  )
  .flat()
  .filter((pos) => pos !== null);
function main() {
  let score = 0;

  for (const [row, col] of startPositions) {
    const movements: PendingMovement[] = [];

    movements.push({
      row,
      col,
      height: 0,
    });

    while (movements.length > 0) {
      const { row, col, height } = movements.shift()!;

      if (height === 9) {
        score++;
        continue;
      }

      for (const [deltaRow, deltaCol] of TRANSFORM) {
        const newRow = row + deltaRow;
        const newCol = col + deltaCol;

        if (
          isInBounds(newRow, newCol) &&
          isValidIncrease(newRow, newCol, height)
        ) {
          movements.push({
            row: newRow,
            col: newCol,
            height: input[newRow][newCol],
          });
        }
      }
    }
  }

  return score;
}

export default main();
