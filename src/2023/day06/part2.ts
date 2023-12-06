import { parseInput } from "../../util";

const input = parseInput({
  split: {
    mapper: false,
  },
});

const time = Number(input[0].match(/\d+/g)!.join(""));
const recordDistance = Number(input[1].match(/\d+/g)!.join(""));

function main() {
  // There's 100% a maths answer here...
  const winningHolds: number[] = [];

  for (let i = 0; i < time; i++) {
    const distance = i * (time - i);

    if (distance > recordDistance) {
      winningHolds.push(i);
    }
  }

  return winningHolds.length;
}

export default main();
