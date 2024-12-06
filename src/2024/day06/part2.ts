import { parseInput } from "../../util";

const map = parseInput<string[]>({
  split: {
    delimiter: "\n",
    mapper: (line) => line.split(""),
  },
});

const GUARD_POSITIONS = ["^", ">", "v", "<"];
const TRANSFORM = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];
const OFF_THE_MAP = "yeeeet";
interface Location {
  row: number;
  col: number;
}

const rotateGuard = (char: string) => {
  const position = GUARD_POSITIONS.indexOf(char);

  return GUARD_POSITIONS[(position + 1) % GUARD_POSITIONS.length];
};

const performMove = (
  map: string[][],
  position: Location,
): [Location | typeof OFF_THE_MAP, boolean] => {
  const char = map[position.row][position.col];
  const positionIndex = GUARD_POSITIONS.indexOf(char);
  const [y, x] = TRANSFORM[positionIndex];

  const newPosition: Location = {
    row: position.row + y,
    col: position.col + x,
  };

  if (
    newPosition.row < 0 ||
    newPosition.col < 0 ||
    newPosition.row >= map.length ||
    newPosition.col >= map[0].length
  ) {
    return [OFF_THE_MAP, false];
  }

  const newChar = map[newPosition.row][newPosition.col];

  if (newChar !== EMPTY_SPACE) {
    map[position.row][position.col] = rotateGuard(char);

    return [position, true];
  }

  map[position.row][position.col] = EMPTY_SPACE;
  map[newPosition.row][newPosition.col] = char;

  return [newPosition, false];
};

const EMPTY_SPACE = "." as const;

const findGuard = (map: string[][]): Location | null => {
  for (const rowIndex in map) {
    const row = map[rowIndex];

    const columnIndex = row.findIndex((char) => GUARD_POSITIONS.includes(char));

    if (columnIndex !== -1) {
      return {
        row: Number(rowIndex),
        col: columnIndex,
      };
    }
  }

  return null;
};

const indexIdentifier = (location: Location) =>
  `${location.row},${location.col}`;
const indexLocation = (identifier: string): Location => {
  const parts = identifier.split(",");
  return {
    row: Number(parts[0]),
    col: Number(parts[1]),
  };
};

const isMapALoop = (map: string[][]): boolean => {
  let guardPosition = findGuard(map)!;
  let visitedPositions = new Set<string>();
  let positionNow: Location | typeof OFF_THE_MAP = guardPosition;

  let isRotation = false;
  while (positionNow !== OFF_THE_MAP) {
    const key = `${positionNow.row},${positionNow.col},${map[positionNow.row][positionNow.col]}`;

    if (!isRotation && visitedPositions.has(key)) {
      return true;
    }

    if (!isRotation) {
      visitedPositions.add(key);
    }

    [positionNow, isRotation] = performMove(map, positionNow);
  }

  return false;
};

function main() {
  let workingMap = JSON.parse(JSON.stringify(map));
  let guardPosition = findGuard(workingMap)!;
  let visitedPositions = new Set<string>();

  let positionNow: Location | null | typeof OFF_THE_MAP = guardPosition;

  while (positionNow !== OFF_THE_MAP) {
    visitedPositions.add(indexIdentifier(positionNow));
    [positionNow] = performMove(workingMap, positionNow);
  }

  visitedPositions.delete(indexIdentifier(guardPosition));

  let count = 0;
  for (const position of visitedPositions.values()) {
    const addAt = indexLocation(position);

    workingMap = JSON.parse(JSON.stringify(map));
    workingMap[addAt.row][addAt.col] = "O";

    if (isMapALoop(workingMap)) {
      count++;
    }
  }

  return count;
}

export default main();
