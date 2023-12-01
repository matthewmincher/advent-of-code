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
    .map((line) => {
      for (var i = 0; i < numberStrings.length; i++) {
        const word = numberStrings[i];

        line = line.replaceAll(word, `${word}${i + 1}${word}`);
      }

      return line;
    })
    .map((line) => line.match(/\d/g) ?? [])
    .map((digits) => Number(digits[0] + digits[digits.length - 1]))
    .reduce((sum, number) => {
      return sum + number;
    }, 0);
}

export default main();
