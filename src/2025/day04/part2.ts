import { parseInput } from "../../util";

const input = parseInput({
  split: {
    mapper: (line) => line.split(""),
  },
});

function main() {
  let accessible = 0;

  let removed;
  do {
    removed = 0;
    for (let y = 0; y < input.length; y++) {
      for (let x = 0; x < input[y].length; x++) {
        if (input[y][x] !== "@") {
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
          input[y][x] = ".";
          accessible++;
          removed++;
        }
      }
    }
  } while (removed > 0);

  return accessible;
}

export default main();
