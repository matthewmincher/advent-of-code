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

const print = (i: number, robots: Robot[]) => {
  console.log(i);
  const map: number[][] = JSON.parse(
    JSON.stringify(new Array(HEIGHT).fill(new Array(WIDTH).fill(0))),
  );

  for (const robot of robots) {
    map[robot.position.y][robot.position.x]++;
  }

  for (const row of map) {
    console.log(row.map((n) => (n > 0 ? "R" : ".")).join(""));
  }
};

function main() {
  for (let i = 0; i < 10000; i++) {
    for (const key in input) {
      input[key] = move(input[key]);
    }

    print(i, input);
  }

  // Yeah... I just searched the output in phpstorm
  return 0;
}

export default main();
