import { parseInput } from "../../util";

const input = parseInput({
  split: {
    mapper: (line) => {
      return line.split(" ").filter(Boolean);
    },
  },
});

function main() {
  let runningTotal = 0;

  for (let i = 0; i < input[0].length; i++) {
    const op = input[4][i];
    const els = [input[0][i], input[1][i], input[2][i], input[3][i]];

    const result = els.reduce((sum, el) => {
      const num = Number(el);

      if (op === "+") {
        return sum + num;
      } else {
        return Math.max(sum, 1) * num;
      }
    }, 0);

    runningTotal += result;
  }

  return runningTotal;
}

export default main();
