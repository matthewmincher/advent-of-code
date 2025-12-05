import { parseInput } from "../../util";

const input = parseInput({
  split: {
    delimiter: "\n\n",
    mapper: false,
  },
});

function main() {
  let ranges = input[0]
    .split("\n")
    .map((r) => r.split("-").map(Number))
    .sort((a, b) => a[0] - b[0]);

  let i = 1;
  while (i < ranges.length) {
    let r = ranges[i];
    let prev = ranges[i - 1];

    if (r[0] >= prev[0] && r[0] <= prev[1]) {
      ranges[i - 1] = [prev[0], Math.max(prev[1], r[1])];
      ranges.splice(i, 1);
    } else {
      i++;
    }
  }

  return ranges.reduce((acc, range) => acc + (range[1] - range[0]) + 1, 0);
}

export default main();
