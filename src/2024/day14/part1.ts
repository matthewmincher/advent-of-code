import { parseInput } from "../../util";
import { isNumberObject } from "node:util/types";

const input = parseInput<Robot>({
  split: {
    delimiter: "\n",
    mapper: (line) => {
      const [x, y, vx, vy] = line.match(/-?\d+/g)!.map((s) => Number(s));

      return {
        position: {
          x,
          y,
        },
        velocity: {
          x: vx,
          y: vy,
        },
      };
    },
  },
});

const WIDTH = 101;
const HEIGHT = 103;

type Robot = {
  position: Position;
  velocity: {
    x: number;
    y: number;
  };
};

type Position = {
  x: number;
  y: number;
};

const move = (robot: Robot): Robot => {
  const newX =
    (((robot.position.x + robot.velocity.x) % WIDTH) + WIDTH) % WIDTH;
  const newY =
    (((robot.position.y + robot.velocity.y) % HEIGHT) + HEIGHT) % HEIGHT;

  return {
    position: {
      x: newX,
      y: newY,
    },
    velocity: robot.velocity,
  };
};

function main() {
  for (let i = 0; i < 100; i++) {
    for (const key in input) {
      input[key] = move(input[key]);
    }
  }

  const quadrants = input.reduce(
    (acc, robot) => {
      const w = WIDTH - 1;
      const h = HEIGHT - 1;
      const x = robot.position.x / w;
      const y = robot.position.y / h;

      if (robot.position.x === w / 2 || robot.position.y === h / 2) {
        return acc;
      }
      acc[`${Math.round(x)}_${Math.round(y)}` as keyof typeof acc]++;

      return acc;
    },
    {
      "0_0": 0,
      "0_1": 0,
      "1_0": 0,
      "1_1": 0,
    },
  );

  console.log(quadrants);

  return (
    quadrants["0_0"] * quadrants["0_1"] * quadrants["1_0"] * quadrants["1_1"]
  );
}

export default main();
