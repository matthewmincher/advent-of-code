import { parseInput } from "../../util";

const input = parseInput<Prize>({
  split: {
    delimiter: "\n\n",
    mapper: (text) => {
      const numbers = text.match(/\d+/g)!.map((n) => Number(n));

      return {
        A: {
          x: numbers[0],
          y: numbers[1],
        },
        B: {
          x: numbers[2],
          y: numbers[3],
        },
        Goal: {
          x: numbers[4] + 10000000000000,
          y: numbers[5] + 10000000000000,
        },
      };
    },
  },
});

type Prize = {
  A: {
    x: number;
    y: number;
  };
  B: {
    x: number;
    y: number;
  };
  Goal: {
    x: number;
    y: number;
  };
};

const solve = (
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  x: number,
  y: number,
) => {
  /* I used chatgpt to rearrange
   * Ax1 + Bx2 = X
   * Ay1 + By2 = Y
   * for A and B
   */

  return {
    a: (y2 * x - x2 * y) / (x1 * y2 - y1 * x2),
    b: (x - ((y2 * x - x2 * y) / (x1 * y2 - y1 * x2)) * x1) / x2,
  };
};

function main() {
  return input
    .map((prize) =>
      solve(
        prize.A.x,
        prize.B.x,
        prize.A.y,
        prize.B.y,
        prize.Goal.x,
        prize.Goal.y,
      ),
    )
    .filter((prize) => {
      return prize.a % 1 === 0 && prize.b % 1 === 0;
    })
    .reduce((acc, val) => acc + val.b + val.a * 3, 0);
}

export default main();
