import { parseInput } from "../../util";

const input = parseInput<Calibration>({
  split: {
    delimiter: "\n",
    mapper: (e) => {
      const [value, numbers] = e.split(":");

      return {
        value: Number(value),
        numbers: numbers
          .trim()
          .split(" ")
          .map((s) => Number(s)),
      };
    },
  },
});

enum Operation {
  ADD,
  MULTIPLY,
}

const tryValid = (
  target: number,
  value: number,
  remainingInput: number[],
): boolean => {
  if (remainingInput.length === 0) {
    return value === target;
  }

  if (value > target) {
    return false;
  }

  if (tryValid(target, value + remainingInput[0], remainingInput.slice(1))) {
    return true;
  }

  if (tryValid(target, value * remainingInput[0], remainingInput.slice(1))) {
    return true;
  }

  return tryValid(
    target,
    Number(`${value}${remainingInput[0]}`),
    remainingInput.slice(1),
  );
};

type Calibration = {
  value: number;
  numbers: number[];
};

function main() {
  return input
    .map((calibration) => {
      return tryValid(
        calibration.value,
        calibration.numbers[0],
        calibration.numbers.slice(1),
      )
        ? calibration.value
        : 0;
    })
    .reduce((acc, val) => acc + val, 0);
}

export default main();
