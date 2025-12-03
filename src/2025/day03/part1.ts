import { parseInput } from "../../util";

const input = parseInput({
  split: {
    mapper: (line) => line.split("").map(Number),
  },
});

function main() {
  let totalJoltage = 0;

  for (const numbers of input) {
    if (numbers.length === 0) {
      //ty phpstorm very cool
      continue;
    }

    let first = -1;
    let firstIndex = -1;
    let second = -1;

    for (let i = 0; i < numbers.length - 1; i++) {
      if (numbers[i] > first) {
        first = numbers[i];
        firstIndex = i;
      }
    }

    for (let i = firstIndex + 1; i < numbers.length; i++) {
      if (numbers[i] > second) {
        second = numbers[i];
      }
    }

    const number = Number(`${first}${second}`);

    totalJoltage += number;
  }

  return totalJoltage;
}

export default main();
