import { parseInput } from "../../util";

const input = parseInput({
  split: false,
});

const patterns = input.split("\n\n").map((section) => section.split("\n"));

function countDifferencesInStrings(a: string, b: string): number {
  let differences = 0;
  for (let i = 0; i < a.length; i++) {
    if (b[i] !== a[i]) {
      differences++;
    }
  }

  return differences;
}

function findHorizontalReflection(section: string[]): number {
  let columns = section[0].length;

  for (let x = 0; x < columns - 1; x++) {
    let diff = 0;

    for (
      let left = x, right = x + 1;
      left >= 0 && right < columns;
      left--, right++
    ) {
      let leftColumn = section.map((row) => row[left]).join("");
      let rightColumn = section.map((row) => row[right]).join("");

      if (leftColumn !== rightColumn) {
        diff += countDifferencesInStrings(leftColumn, rightColumn);
      }
    }

    if (diff === 1) {
      return x + 1;
    }
  }

  return 0;
}

function findVerticalReflection(section: string[]): number {
  let rows = section.length;

  for (let y = 0; y < rows - 1; y++) {
    let diff = 0;

    for (
      let left = y, right = y + 1;
      left >= 0 && right < rows;
      left--, right++
    ) {
      let leftRow = section[left];
      let rightRow = section[right];

      if (leftRow != rightRow) {
        diff += countDifferencesInStrings(leftRow, rightRow);
      }
    }

    if (diff === 1) {
      return y + 1;
    }
  }

  return 0;
}

function main() {
  return patterns
    .map(
      (pattern) =>
        findHorizontalReflection(pattern) +
        findVerticalReflection(pattern) * 100
    )
    .reduce((previous, next) => previous + next, 0);
}

export default main();
