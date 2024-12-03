import { parseInput } from "../../util";

const input = parseInput({
  split: false,
});

function main() {
  const ops = input.matchAll(
    /(mul\([0-9]{1,3},[0-9]{1,3}\))|(do\(\)|don't\(\))/g,
  );

  let sum = 0;
  let isOn = true;
  for (const op of ops) {
    if (op[0] === "do()") {
      isOn = true;
      continue;
    }

    if (op[0] === "don't()") {
      isOn = false;
      continue;
    }

    if (!isOn) {
      continue;
    }

    const parts = op[0].split(",");
    const first = parts[0].replace("mul(", "");
    const second = parts[1].replace(")", "");

    sum += Number(first) * Number(second);
  }

  return sum;
}

export default main();
