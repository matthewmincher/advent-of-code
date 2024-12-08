import { parseInput } from "../../util";
import { domainToASCII } from "node:url";

const input = parseInput<string[]>({
  split: {
    delimiter: "\n",
    mapper: (e) => e.split(""),
  },
});

const EMPTY_SPACE = ".";

const findPossibleLocations = (
  targetChar: string,
  targetRow: number,
  targetCol: number,
) => {
  const possibilities: [row: number, col: number][] = [];

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      const char = input[row][col];

      if (char !== targetChar) {
        continue;
      }

      if (targetRow === row && targetCol === col) {
        continue;
      }

      const delta = [targetRow - row, targetCol - col];

      possibilities.push([targetRow + delta[0], targetCol + delta[1]]);
    }
  }

  return possibilities;
};

const isInBounds = (row: number, col: number) => {
  if (row < 0 || col < 0) {
    return false;
  }

  if (row >= input.length || col >= input[0].length) {
    return false;
  }

  return true;
};

function main() {
  const antinodes = new Set<string>();
  const dirtyMap = JSON.parse(JSON.stringify(input)) as string[][];

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      const char = input[row][col];

      if (char === EMPTY_SPACE) {
        continue;
      }

      const locations = findPossibleLocations(char, row, col).filter(([r, c]) =>
        isInBounds(r, c),
      );

      for (const [y, x] of locations) {
        dirtyMap[y][x] = "#";
        antinodes.add(`${y}-${x}`);
      }
    }
  }

  for (const row of dirtyMap) {
    console.log(row.join(","));
  }

  return antinodes.size;
}

export default main();
