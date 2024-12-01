import { parseInput } from "../../util";

const input = parseInput<string>({
  split: {
    mapper: false,
  },
});

function main() {
  const columns = input.reduce(
    (cols, line) => {
      const numbers = line.split(/\s+/);

      cols[0].push(Number(numbers[0]));
      cols[1].push(Number(numbers[1]));

      return cols;
    },
    [[], []] as number[][],
  );

  for (const i in columns) {
    columns[i].sort();
  }

  const count = columns[0].length;
  let diff = 0;
  for (let i = 0; i < count; i++) {
    diff += Math.abs(columns[0][i] - columns[1][i]);
  }

  return diff;
}

export default main();
