import { parseInput } from "../../util";

const input = parseInput<string>({
  split: {
    mapper: false,
  },
});

const isSorted = (array: number[]) => {
  return isAscending(array) || isDescending(array);
};

const isAscending = (array: number[]) => {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      return false;
    }
  }

  return true;
};
const isDescending = (array: number[]) => {
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] < array[i + 1]) {
      return false;
    }
  }

  return true;
};

const isSafeChange = (array: number[]) => {
  for (let i = 0; i < array.length - 1; i++) {
    const delta = Math.abs(array[i] - array[i + 1]);
    if (delta < 1 || delta > 3) {
      return false;
    }
  }

  return true;
};

function main() {
  return input
    .map((line) => line.split(/\s+/).map((s) => Number(s)))
    .filter(isSorted)
    .filter(isSafeChange).length;
}

export default main();
