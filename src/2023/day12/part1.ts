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

function getCombinationCount(springs: Spring[], groups: number[]): number {
  if (!springs.length) {
    return groups.length ? 0 : 1; // No springs left but we should have
  }

  if (!groups.length) {
    return springs.includes("#") ? 0 : 1; // No broken left, but we should have
  }

  const spring = springs[0];
  const group = groups[0];

  let count = 0;

  if (spring === "." || spring === "?") {
    count += getCombinationCount(springs.slice(1), groups);
  }

  if (spring === "#" || spring === "?") {
    if (
      group <= springs.length && // Enough springs left?
      !springs.slice(0, group).includes(".") && // No working springs in the group
      (group === springs.length || springs[group] !== "#") // No springs after group or trailing spring isn't broken
    ) {
      count += getCombinationCount(springs.slice(group + 1), groups.slice(1));
    }
  }
  return count;
}

function main() {
  return input
    .map((row) => getCombinationCount(row.springs, row.groups))
    .reduce((last, next) => last + next);
}

export default main();
