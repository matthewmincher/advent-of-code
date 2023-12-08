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

function factor(number: number, factors: number[]) {
  const n = trialDivision(number);
  factors.push(n);

  if (n === number) {
    return factors;
  }

  return factor(number / n, factors);
}

function trialDivision(number: number): number {
  const factors = [];

  let factor = 2;
  while (number > 1) {
    if (number % factor === 0) {
      factors.push(factor);
      number = Math.floor(number / factor);
    } else {
      factor++;
    }
  }

  return factors[factors.length - 1];
}

function calculateSmallestCommonLoop(stepCounts: number[]): number {
  return stepCounts
    .map((number) => {
      return factor(number, []);
    })
    .reduce((factors, mergedListOfFactors) => {
      return Array.from(new Set(factors.concat(mergedListOfFactors)));
    }, [])
    .reduce((factor, accumulator) => {
      return accumulator * factor;
    });
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

const startingNodes = Object.values(nodes).filter((node) =>
  node.name.endsWith("A")
);

function main() {
  let positions = startingNodes.map((node) => node.name);
  let stepsToFinish: Record<number, number> = {};

  let step = 0;
  while (true) {
    const direction = getInstructionForStep(step);

    positions.forEach((position, index) => {
      const currentNode = nodes[position]!;
      const nextNodeName = currentNode[direction];

      positions[index] = nextNodeName;

      if (nextNodeName.endsWith("Z")) {
        stepsToFinish[index] = step + 1;
      }
    });

    step++;

    if (Object.keys(stepsToFinish).length === positions.length) {
      return calculateSmallestCommonLoop(Object.values(stepsToFinish));
    }
  }
}

export default main();
