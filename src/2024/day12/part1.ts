import { parseInput } from "../../util";

const input = parseInput<string[]>({
  split: {
    delimiter: "\n",
    mapper: (l) => l.split(""),
  },
});

const TRANSFORM = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const validNeighbours = (row: number, col: number): [number, number][] => {
  let neighbours = Array<[number, number]>();

  const width = input[0].length;
  const height = input.length;

  for (const [deltaX, deltaY] of TRANSFORM) {
    const targetRow = row + deltaY;

    if (targetRow < 0 || targetRow >= height) {
      continue;
    }

    const targetCol = col + deltaX;
    if (targetCol < 0 || targetCol >= width) {
      continue;
    }

    neighbours.push([targetRow, targetCol]);
  }

  return neighbours;
};

function main() {
  const visited = new Set<string>();

  let result = 0;

  for (const rowIndex of input.keys()) {
    for (const colIndex of input[rowIndex].keys()) {
      const cellId = `${rowIndex}-${colIndex}`;

      if (visited.has(cellId)) {
        continue;
      }

      visited.add(cellId);

      const char = input[rowIndex][colIndex];

      let cells = 0;
      let connections = 0;
      const toVisit = [[rowIndex, colIndex]];

      let cell: number[] | undefined;
      while ((cell = toVisit.pop())) {
        let [row, col] = cell;

        cells++;

        for (const [nRow, nCol] of validNeighbours(row, col)) {
          const nCellId = `${nRow}-${nCol}`;
          if (input[nRow][nCol] !== char) {
            continue;
          }

          connections++;

          if (visited.has(nCellId)) {
            continue;
          }

          visited.add(nCellId);
          toVisit.push([nRow, nCol]);
        }
      }

      const perimeter = cells * 4 - connections;

      result += cells * perimeter;
    }
  }

  return result;
}

export default main();
