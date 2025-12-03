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

    let selection: Array<number> = [];

    for (let digitsRequired = 12, i = 0; digitsRequired > 0; digitsRequired--) {
      const possibleDigits = numbers.slice(
        i,
        numbers.length - digitsRequired + 1,
      );
      const max = Math.max(...possibleDigits);

      i += possibleDigits.indexOf(max) + 1;
      selection.push(max);
    }

    const number = Number(selection.join(""));

    totalJoltage += number;
  }

  return totalJoltage;
}

export default main();
