import { parseInput } from "../../util";

class Node<T> {
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;

  constructor(public data: T) {}
}

class LinkedList<T> {
  private head: Node<T> | null = null;

  public add(data: T): Node<T> {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
    } else {
      const last = this.last();

      node.prev = last;
      last!.next = node;
    }

    return node;
  }

  public first(): Node<T> | null {
    return this.head;
  }

  public last(): Node<T> | null {
    if (!this.head) {
      return null;
    }

    const recurse = (node: Node<T>): Node<T> => {
      return node.next ? recurse(node.next) : node;
    };

    return recurse(this.head);
  }
}

const input = parseInput<string>({
  split: {
    mapper: false,
  },
}).filter(Boolean);

type StepName =
  | "seed"
  | "soil"
  | "fertilizer"
  | "water"
  | "light"
  | "temperature"
  | "humidity"
  | "location";
type StepRange = {
  source: number;
  destination: number;
  length: number;
};
type StepMap = {
  sourceStep: StepName;
  destinationStep: StepName;

  ranges: StepRange[];
};

const seedInput = input.shift()!.replace("seeds: ", "").split(" ").map(Number);
const seedRanges = seedInput.flatMap((_value, index, array) =>
  index % 2 ? [] : [array.slice(index, index + 2)]
);

const maps: LinkedList<StepMap> = new LinkedList();

let currentMap: StepMap;
input.forEach((line) => {
  if (line.indexOf(":") !== -1) {
    const [src, dest] = line.replace(" map:", "").split("-to-");

    const sourceStep = src as StepName;
    const destinationStep = dest as StepName;

    const map = {
      sourceStep: sourceStep,
      destinationStep: destinationStep,

      ranges: [],
    };

    maps.add(map);
    currentMap = map;

    return;
  }

  const [destinationNumber, sourceNumber, length] = line.split(" ");

  currentMap!.ranges.push({
    source: Number(sourceNumber),
    destination: Number(destinationNumber),
    length: Number(length),
  });
});

function traverseToEnd(node: Node<StepMap>, sourceNumber: number): number {
  let destinationNumber: number | null = null;

  for (const range of node.data.ranges) {
    const rangeStart = range.source;
    const rangeEnd = rangeStart + range.length;

    if (sourceNumber >= rangeStart && sourceNumber < rangeEnd) {
      destinationNumber = range.destination + (sourceNumber - rangeStart);

      break;
    }
  }

  if (destinationNumber === null) {
    destinationNumber = sourceNumber;
  }

  if (node.next) {
    return traverseToEnd(node.next, destinationNumber);
  }

  return destinationNumber;
}

// brute_force.exe
function main() {
  let lowest: [number, number] = [-1, Number.MAX_SAFE_INTEGER];
  const startNode = maps.first()!;

  for (const range of seedRanges) {
    for (let i = range[0]; i < range[0] + range[1]; i++) {
      const location = traverseToEnd(startNode, i);

      if (location < lowest[1]) {
        lowest = [i, location];
      }
    }
  }

  return lowest[1];
}

export default main();
