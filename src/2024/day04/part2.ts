import { parseInput } from "../../util";

const input = parseInput({
  split: {
    mapper: false,
  },
});

const hasShape = (letters: string[][], row: number, col: number): boolean => {
  if (letters[row][col] !== "A") {
    return false;
  }

  if (row - 1 < 0 || col - 1 < 0) {
    return false;
  }

  if (row + 1 >= letters.length || col + 1 > letters[0].length) {
    return false;
  }

  const topLeft = letters[row - 1][col - 1];
  const bottomLeft = letters[row + 1][col - 1];
  const bottomRight = letters[row + 1][col + 1];
  const topRight = letters[row - 1][col + 1];

  return ["MSMS", "MMSS", "SMSM", "SSMM"].includes(
    `${topLeft}${topRight}${bottomLeft}${bottomRight}`,
  );
};

function main() {
  const letters = input.map((line) => line.split(""));

  let countXmas = 0;
  for (let row = 0; row < letters.length; row++) {
    for (let col = 0; col < letters[0].length; col++) {
      if (hasShape(letters, row, col)) {
        countXmas++;
      }
    }
  }

  return countXmas;
}

export default main();
