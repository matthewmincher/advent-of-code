import { parseInput } from "../../util";

const input = parseInput<string>({
  split: {
    mapper: false,
  },
});

function main() {
  let val = 50;
  let timesAtZero = 0;
  for (const line of input) {
    const subtract = line.charAt(0) === "L";
    const number = Number(line.slice(1));

    for (let i = 0; i < number; i++) {
      val = (val + (subtract ? -1 : 1)) % 100;

      if (val === 0) {
        timesAtZero++;
      }
    }
  }

  return timesAtZero;
}

export default main();
