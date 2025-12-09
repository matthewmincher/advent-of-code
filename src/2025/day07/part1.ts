import { parseInput } from "../../util";

type Start = "S";
type Splitter = "^";
type Beam = "|";
type Space = ".";

type CellEntity = Start | Splitter | Beam | Space;

type CellReference = {
  x: number;
  y: number;
};

type Cell = {
  entity: CellEntity;
  reference: CellReference;
  isStart: boolean;
};

const input = parseInput({
  split: {
    mapper: (line) => line.split("") as CellEntity[],
  },
});

function main() {
  let grid = new Array<Cell[]>();

  function getCellByReference(reference: CellReference) {
    if (reference.y >= grid.length || reference.x >= grid[0].length) {
      return null;
    }

    return grid[reference.y][reference.x];
  }

  for (let row = 0; row < input.length; row++) {
    grid[row] = new Array<Cell>();

    for (let col = 0; col < input[row].length; col++) {
      grid[row][col] = {
        entity: input[row][col],
        reference: {
          x: col,
          y: row,
        },
        isStart: input[row][col] === "S",
      };
    }
  }

  let queue: Cell[] = [];
  let visited = new Set<CellReference>();

  queue.push(grid.flat().find((cell) => cell.isStart)!);

  let splits = 0;
  while (queue.length > 0) {
    const next = queue.shift()!;

    const targetX = next.reference.x;
    const targetY = next.reference.y + 1;

    const targetCell = getCellByReference({ x: targetX, y: targetY });

    if (!targetCell) {
      continue;
    }

    if (targetCell.entity === ".") {
      queue.push(targetCell);
    } else if (
      targetCell.entity === "^" &&
      !visited.has(targetCell.reference)
    ) {
      splits++;
      visited.add(targetCell.reference);

      const splitLeft = getCellByReference({ x: targetX - 1, y: targetY });
      if (splitLeft) {
        queue.push(splitLeft);
      }

      const splitRight = getCellByReference({ x: targetX + 1, y: targetY });
      if (splitRight) {
        queue.push(splitRight);
      }
    }
  }

  return splits;
}

export default main();
