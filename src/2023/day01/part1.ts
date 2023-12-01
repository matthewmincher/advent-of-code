import { parseInput } from "../../util";

const input = parseInput<string>({
  split: {
    mapper: false,
  },
});

const numberStrings = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function main() {
  return input
    .map((line) => line.match(/\d/g) ?? [])
    .map((digits) => Number(digits[0] + digits[digits.length - 1]))
    .reduce((sum, number) => sum + number, 0);
}

export default main();
