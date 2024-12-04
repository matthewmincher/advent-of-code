import { parseInput } from "../../util";

const input = parseInput({
  split: {
    mapper: false,
  },
});

const sequence = ["X", "M", "A", "S"];

const hasSequence = (
  letters: string[][],
  row: number,
  col: number,
  nextRow: number,
  nextCol: number,
): boolean => {
  for (let i = 0; i < sequence.length; i++) {
    const targetRow = row + i * nextRow;
    const targetCol = col + i * nextCol;

    if (
      targetRow < 0 ||
      targetCol < 0 ||
      targetRow >= letters.length ||
      targetCol >= letters[0].length
    ) {
      return false;
    }

    if (letters[targetRow][targetCol] !== sequence[i]) {
      return false;
    }
  }

  return true;
};

function main() {
  const letters = input.map((line) => line.split(""));

  let countXmas = 0;
  for (let row = 0; row < letters.length; row++) {
    for (let col = 0; col < letters[0].length; col++) {
      for (let nextRowDir = -1; nextRowDir <= 1; nextRowDir++) {
        for (let nextColDir = -1; nextColDir <= 1; nextColDir++) {
          if (hasSequence(letters, row, col, nextRowDir, nextColDir)) {
            // hadouken
            countXmas++;
          }
        }
      }
    }
  }

  return countXmas;
}

export default main();
