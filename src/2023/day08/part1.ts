import { parseInput } from "../../util";

const input = parseInput<string>({
  split: {
    mapper: false,
  },
}).filter(Boolean);

type Direction = "L" | "R";

type Node = {
  name: string;
  L: Direction;
  R: Direction;
};

let instructions: Direction[];
let nodes: Record<string, Node> = {};

function getInstructionForStep(step: number): Direction {
  const index = step % instructions.length;

  return instructions[index]!;
}

input.forEach((line, index) => {
  if (!index) {
    instructions = line.split("") as Direction[];
  } else {
    const [_, name, L, R] = line.match(/^([A-Z]+) = \(([A-Z]+), ([A-Z]+)\)$/)!;

    nodes[name] = {
      name,
      L: L as Direction,
      R: R as Direction,
    };
  }
});

function main() {
  let position = "AAA";

  let step = 0;
  while (true) {
    const currentNode = nodes[position]!;
    const direction = getInstructionForStep(step);
    const nextNodeName = currentNode[direction];

    position = nextNodeName;
    step++;

    if (position === "ZZZ") {
      return step;
    }
  }
}

export default main();
