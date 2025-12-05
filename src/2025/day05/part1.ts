import { parseInput } from "../../util";

const input = parseInput({
  split: {
    delimiter: "\n\n",
    mapper: false,
  },
});

function main() {
  const ranges = input[0].split("\n").map((r) => r.split("-").map(Number));
  const items = input[1].split("\n").map(Number);

  const fresh = items.filter((num) =>
    ranges.some((r) => num >= r[0] && num <= r[1]),
  );

  return fresh.length;
}

export default main();
