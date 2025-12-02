import { parseInput } from "../../util";

const input = parseInput({
  split: {
    mapper: (line) =>
      line.split(",").map((range) => range.split("-").map(Number)),
  },
})[0];

function main() {
  const invalidIds: Array<number> = [];
  const pattern = /^(\d+)\1$/;

  for (const [min, max] of input) {
    for (let i = min; i <= max; i++) {
      if (pattern.test(`${i}`)) {
        invalidIds.push(i);
      }
    }
  }

  return invalidIds.reduce((sum, id) => sum + id, 0);
}

export default main();
