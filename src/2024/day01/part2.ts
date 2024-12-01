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
  let similarity = 0;
  for (let i = 0; i < count; i++) {
    const instances = columns[1].filter((n) => n == columns[0][i]).length;
    similarity += columns[0][i] * instances;
  }

  return similarity;
}

export default main();
