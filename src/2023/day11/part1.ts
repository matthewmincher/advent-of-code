import { parseInput } from "../../util";

const input = parseInput<string[]>({
  split: {
    mapper: (line) => {
      return line.split("");
    },
  },
});

function expandUniverse(universe: string[][]): string[][] {
  const transposedUniverse = universe[0].map((x, i) =>
    universe.map((x) => x[i])
  );
  const expandedUniverse = universe.map((row) => row.map((char) => char));

  const emptyColumnIndexes: number[] = [];
  const emptyRowIndexes: number[] = [];

  for (let row = 0; row < universe.length; row++) {
    if (universe[row].every((char) => char === ".")) {
      emptyRowIndexes.push(row);
    }
  }

  for (let col = 0; col < transposedUniverse.length; col++) {
    if (transposedUniverse[col].every((char) => char === ".")) {
      emptyColumnIndexes.push(col);
    }
  }

  const emptyRow = new Array(transposedUniverse.length).fill(".");

  for (const col of emptyColumnIndexes.reverse()) {
    for (const row of expandedUniverse) {
      row.splice(col, 0, ".");
    }
  }

  for (const row of emptyRowIndexes.reverse()) {
    expandedUniverse.splice(row, 0, emptyRow);
  }

  return expandedUniverse;
}

class Node {
  constructor(
    public row: number,
    public col: number,
    public distance: number
  ) {}
}

class Galaxy {
  constructor(
    public row: number,
    public col: number,
    public index: number
  ) {}
}

function minimumDistance(
  sourceCol: number,
  sourceRow: number,
  destinationCol: number,
  destinationRow: number,
  map: string[][]
): number {
  const rows = map.length;
  const cols = map[0].length;
  const source: Node = new Node(sourceRow, sourceCol, 0);

  const visitedNodes = Array.from(Array(rows), () => Array(cols).fill(0));

  const queue: Node[] = [];
  queue.push(source);
  visitedNodes[source.row][source.col] = true;

  while (queue.length !== 0) {
    const node = queue.shift()!;

    if (node.col === destinationCol && node.row === destinationRow) {
      return node.distance;
    }

    if (node.row - 1 >= 0 && !visitedNodes[node.row - 1][node.col]) {
      queue.push(new Node(node.row - 1, node.col, node.distance + 1));
      visitedNodes[node.row - 1][node.col] = 1;
    }

    if (node.row + 1 < rows && !visitedNodes[node.row + 1][node.col]) {
      queue.push(new Node(node.row + 1, node.col, node.distance + 1));
      visitedNodes[node.row + 1][node.col] = 1;
    }

    if (node.col - 1 >= 0 && !visitedNodes[node.row][node.col - 1]) {
      queue.push(new Node(node.row, node.col - 1, node.distance + 1));
      visitedNodes[node.row][node.col - 1] = 1;
    }

    if (node.col + 1 < cols && !visitedNodes[node.row][node.col + 1]) {
      queue.push(new Node(node.row, node.col + 1, node.distance + 1));
      visitedNodes[node.row][node.col + 1] = 1;
    }
  }

  return -1;
}

function main() {
  const universe = expandUniverse(input);

  const galaxies: Galaxy[] = [];

  let i = 1;
  for (let rowIndex in universe) {
    for (let colIndex in universe[rowIndex]) {
      const char = universe[rowIndex][colIndex];

      if (char !== ".") {
        const galaxy = new Galaxy(Number(rowIndex), Number(colIndex), i++);
        galaxies.push(galaxy);
      }
    }
  }

  const pairs = galaxies.flatMap((v, i) =>
    galaxies.slice(i + 1).map((w) => [v, w])
  );

  return pairs
    .map(([a, b]) => minimumDistance(a.col, a.row, b.col, b.row, universe))
    .reduce((prev, curr) => {
      return prev + curr;
    });
}

export default main();
