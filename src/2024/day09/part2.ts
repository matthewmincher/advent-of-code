import { parseInput } from "../../util";

const input = parseInput({
  split: { delimiter: "" },
});

const EMPTY_SPACE = ".";

function main() {
  let isFreeSpace = false;
  let fileId = 0;

  const els = input.flatMap((number) => {
    const arr = new Array<string>(number);

    arr.fill(isFreeSpace ? "." : `${fileId++}`);

    isFreeSpace = !isFreeSpace;

    return arr;
  });

  const fileSizes = new Map<string, number>();

  for (const el of els) {
    if (el === EMPTY_SPACE) {
      continue;
    }

    fileSizes.set(el, (fileSizes.get(el) ?? 0) + 1);
  }

  for (let i = els.length - 1; i >= 0; i--) {
    const file = els[i];

    if (file === EMPTY_SPACE) {
      continue;
    }

    const size = fileSizes.get(file)!;

    const placeAt = els.findIndex(
      (c, j) =>
        c === EMPTY_SPACE && // Start at empty space
        j < i && // Don't move right
        els.slice(j, j + size).every((c) => c === EMPTY_SPACE), // There's enough trailing space
    );

    if (placeAt === -1) {
      continue;
    }

    els.fill(file, placeAt, placeAt + size); // Place file into free space
    els.fill(EMPTY_SPACE, i - size + 1, i + 1); // Replace the file with free space (backwards as we're at the end of a file)
  }

  return els.reduce((acc, char, index) => {
    if (char === EMPTY_SPACE) {
      return acc;
    }

    return acc + index * Number(char);
  }, 0);
}

export default main();
