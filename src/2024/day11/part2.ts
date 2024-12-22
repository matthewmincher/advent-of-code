import { parseInput } from "../../util";
import { it } from "node:test";

const input = parseInput({
  split: {
    delimiter: " ",
  },
});

const cache = new Map<string, number>();

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

const recurseBlinks = (number: number, iteration: number): number => {
  const cacheKey = `${number}_${iteration}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  if (iteration <= 0) {
    return 1;
  }

  const stones = blinkAtStone(number);

  const count = stones.reduce((acc, stone) => {
    return acc + recurseBlinks(stone, iteration - 1);
  }, 0);

  cache.set(cacheKey, count);

  return count;
};

function main() {
  return input.reduce((acc, stone) => acc + recurseBlinks(stone, 75), 0);
}

export default main();
