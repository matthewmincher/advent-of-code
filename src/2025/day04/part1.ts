import { parseInput } from "../../util";

const input = parseInput({
  split: {
    mapper: (line) => line.split(""),
  },
});

function main() {
  let accessible = 0;

  for (let y = 0; y < input.length; y++) {
    const row = input[y];

    for (let x = 0; x < row.length; x++) {
      if (row[x] !== "@") {
        continue;
      }

      let adjacent = 0;

      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (dx === 0 && dy === 0) {
            continue;
          }

          if (input[y + dy]?.[x + dx] === "@") {
            adjacent++;
          }
        }
      }

      if (adjacent < 4) {
        accessible++;
      }
    }
  }

  return accessible;
}

export default main();
