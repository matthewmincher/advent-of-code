import { parseInput } from "../../util";

type OperationalSpring = ".";
type BrokenSpring = "#";
type UnknownSpring = "?";

type Spring = OperationalSpring | BrokenSpring | UnknownSpring;

type Row = {
  springs: Spring[];
  groups: number[];
};

const input = parseInput<Row>({
  split: {
    mapper: (line) => {
      const [chars, groups] = line.split(" ");

      return {
        springs: chars.split("") as Spring[],
        groups: groups.split(",").map(Number),
      };
    },
  },
});

const resultCache: Map<string, number> = new Map();

function getCombinationCount(springs: Spring[], groups: number[]): number {
  const cacheKey = JSON.stringify({
    springs,
    groups,
  });
  if (resultCache.has(cacheKey)) {
    return resultCache.get(cacheKey)!;
  }

  if (!springs.length) {
    return groups.length ? 0 : 1;
  }

  if (!groups.length) {
    return springs.includes("#") ? 0 : 1;
  }

  const spring = springs[0];
  const group = groups[0];

  let count = 0;

  if (spring === "." || spring === "?") {
    count += getCombinationCount(springs.slice(1), groups);
  }

  if (spring === "#" || spring === "?") {
    if (
      group <= springs.length &&
      !springs.slice(0, group).includes(".") &&
      (group === springs.length || springs[group] !== "#")
    ) {
      count += getCombinationCount(springs.slice(group + 1), groups.slice(1));
    }
  }

  resultCache.set(cacheKey, count);

  return count;
}

function expandRow(row: Row): Row {
  return {
    springs: Array.from(new Array(5))
      .fill(row.springs.join(""))
      .join("?")
      .split("") as Spring[],
    groups: Array.from(new Array(5).fill(row.groups)).flat(),
  };
}

function main() {
  return input
    .map(expandRow)
    .map((row) => getCombinationCount(row.springs, row.groups))
    .reduce((last, next) => last + next);
}

export default main();
