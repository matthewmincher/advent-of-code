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

const isContiguousPoint = (
  row: number,
  col: number,
  deltaX: number,
  deltaY: number,
): boolean => {
  const nRow = row + deltaY;
  const nCol = col + deltaX;

  if (nRow < 0 || nCol < 0) {
    return false;
  }
  if (nRow >= input.length || nCol >= input[0].length) {
    return false;
  }

  return input[row][col] === input[nRow][nCol];
};

const validCorners = (cells: number[][]): number => {
  let sides = 0;

  for (const [row, col] of cells) {
    // prettier trashes this but we count the corners where changes of crop happen
    sides += [
      !isContiguousPoint(row, col, 0, -1) &&
        !isContiguousPoint(row, col, -1, 0),
      !isContiguousPoint(row, col, 0, -1) && !isContiguousPoint(row, col, 1, 0),
      !isContiguousPoint(row, col, 0, 1) && !isContiguousPoint(row, col, -1, 0),
      !isContiguousPoint(row, col, 0, 1) && !isContiguousPoint(row, col, 1, 0),
      !isContiguousPoint(row, col, -1, -1) &&
        isContiguousPoint(row, col, -1, 0) &&
        isContiguousPoint(row, col, 0, -1),
      !isContiguousPoint(row, col, 1, -1) &&
        isContiguousPoint(row, col, 1, 0) &&
        isContiguousPoint(row, col, 0, -1),
      !isContiguousPoint(row, col, -1, 1) &&
        isContiguousPoint(row, col, -1, 0) &&
        isContiguousPoint(row, col, 0, 1),
      !isContiguousPoint(row, col, 1, 1) &&
        isContiguousPoint(row, col, 1, 0) &&
        isContiguousPoint(row, col, 0, 1),
    ].filter(Boolean).length;
  }

  return sides;
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

      let cells: number[][] = [];
      let connections = 0;
      const toVisit = [[rowIndex, colIndex]];

      let cell: number[] | undefined;
      while ((cell = toVisit.pop())) {
        let [row, col] = cell;

        cells.push(cell);

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

      result += cells.length * validCorners(cells);
    }
  }

  return result;
}

export default main();
