import { parseInput } from "../../util";

const input = parseInput({
  split: {
    mapper: false,
  },
});

function main() {
  let runningTotal = 0;

  let number: string[] = [];

  for (let col = input[0].length - 1; col >= 0; col--) {
    let char = "";
    for (let row = 0; row < input.length - 1; row++) {
      let c = input[row].charAt(col);

      char += c;
    }
    number.push(char);

    const op = input[input.length - 1].charAt(col).trim();
    if (!op) {
      continue;
    }

    runningTotal += number.reduce((sum, el) => {
      const num = Number(el);

      if (op === "+") {
        return sum + num;
      } else {
        return Math.max(sum, 1) * num;
      }
    }, 0);

    number = [];
    col--;
  }

  return runningTotal;
}

export default main();
