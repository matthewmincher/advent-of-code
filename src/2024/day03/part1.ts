import { parseInput } from "../../util";

const input = parseInput({
  split: false,
});

function main() {
  const ops = input.matchAll(/mul\([0-9]{1,3},[0-9]{1,3}\)/g);

  let sum = 0;
  for (const op of ops) {
    const parts = op[0].split(",");
    const first = parts[0].replace("mul(", "");
    const second = parts[1].replace(")", "");

    sum += Number(first) * Number(second);
  }

  return sum;
}

export default main();
