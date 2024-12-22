import { parseInput } from "../../util";

const input = parseInput({
  split: {
    delimiter: " ",
  },
});

const blinkAtStone = (number: number): number[] => {
  if (number === 0) {
    return [1];
  }

  const numbers = `${number}`;
  if (numbers.length % 2 === 0) {
    const mid = Math.ceil(numbers.length / 2);
    return [Number(numbers.slice(0, mid)), Number(numbers.slice(mid))];
  }

  return [number * 2024];
};

function main() {
  let stones = input;

  for (let i = 0; i < 25; i++) {
    stones = stones.flatMap(blinkAtStone);
  }

  return stones.length;
}

export default main();
