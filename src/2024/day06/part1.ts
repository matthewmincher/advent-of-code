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
): Location | typeof OFF_THE_MAP => {
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
    return OFF_THE_MAP;
  }

  const newChar = map[newPosition.row][newPosition.col];

  if (newChar !== EMPTY_SPACE) {
    map[position.row][position.col] = rotateGuard(char);

    return position;
  }

  map[position.row][position.col] = EMPTY_SPACE;
  map[newPosition.row][newPosition.col] = char;

  return newPosition;
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

function main() {
  let guardPosition = findGuard(map)!;
  let visitedPositions = new Set<string>();

  let positionNow: Location | null | typeof OFF_THE_MAP = guardPosition;

  while (positionNow !== OFF_THE_MAP) {
    visitedPositions.add(indexIdentifier(positionNow));
    positionNow = performMove(map, positionNow);

    // console.log("---");
    // console.group();
    // for (const row of map) {
    //   console.log(row.join(","));
    // }
    // console.groupEnd();
  }

  return visitedPositions.size;
}

export default main();
