import { parseInput } from "../../util";

const input = parseInput<string[]>({
  split: {
    mapper: (line) => line.split(""),
  },
});

type Map = Cell[][];
type Direction = "N" | "E" | "S" | "W";
type PipeConections = [Direction, Direction];
type Pipe = "|" | "-" | "L" | "J" | "7" | "F";
type Vector = [x: number, y: number];

class Cell {
  x: number;
  y: number;
  pipe: Pipe | null;
  isStart: boolean;

  public constructor(
    x: number,
    y: number,
    pipe: Pipe | null,
    isStart: boolean
  ) {
    this.x = x;
    this.y = y;
    this.pipe = pipe;
    this.isStart = isStart;
  }
}

const pipes: Record<Pipe, PipeConections> = {
  "|": ["N", "S"],
  "-": ["E", "W"],
  L: ["E", "N"],
  J: ["N", "W"],
  "7": ["S", "W"],
  F: ["E", "S"],
};

const movements: Record<Direction, Vector> = {
  N: [0, -1],
  E: [1, 0],
  S: [0, 1],
  W: [-1, 0],
};

const reverse: Record<Direction, Direction> = {
  N: "S",
  S: "N",
  E: "W",
  W: "E",
};

function apply(vector: Vector, x: number, y: number): [x: number, y: number] {
  return [x + vector[0], y + vector[1]];
}

function addConnectionsToStart(map: Map): void {
  const start = map.flat().find((cell) => cell.isStart)!;

  const connections: Direction[] = [];

  Object.entries(movements).forEach(([dir, vector]) => {
    const [neighborX, neighborY] = apply(vector, start.x, start.y);
    const neighbor = map[neighborY][neighborX]!;

    if (!neighbor?.pipe) {
      return;
    }

    const direction = dir as Direction;
    const neighborConnections = pipes[neighbor.pipe];
    const backToStart = reverse[direction as Direction];
    if (neighborConnections.includes(backToStart)) {
      connections.push(direction);
    }
  });

  connections.sort();

  start.pipe = Object.entries(pipes).find(([_pipe, pipeConnections]) => {
    return pipeConnections.toString() == connections.toString();
  })![0]! as Pipe;
}

function traverse(
  map: Map,
  position: Cell,
  entryDirection: Direction
): [position: Cell, entryDirection: Direction] {
  const backDirection = reverse[entryDirection];
  const exitDirection = pipes[position.pipe!].find(
    (direction) => direction !== backDirection
  )!;
  const movement = movements[exitDirection];
  const [nextX, nextY] = apply(movement, position.x, position.y);

  const nextCell = map[nextY][nextX];

  return [nextCell, exitDirection];
}

function main() {
  const map: Map = input.map((row, y) => {
    return row.map((char, x) => {
      if (char === "S") return new Cell(x, y, null, true);
      if (char === ".") return new Cell(x, y, null, false);

      return new Cell(x, y, char as Pipe, false);
    });
  });

  addConnectionsToStart(map);

  let position = map.flat().find((cell) => cell.pipe !== null && cell.isStart)!;
  if (!position.pipe) {
    throw "No start pipe";
  }

  let direction = pipes[position.pipe].at(0)!;
  let steps = 0;
  do {
    [position, direction] = traverse(map, position, direction);

    steps++;
  } while (!position.isStart);

  return steps / 2;
}

export default main();
