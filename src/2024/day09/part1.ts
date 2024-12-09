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

  for (let i = els.length - 1; i >= 0; i--) {
    if (els[i] === EMPTY_SPACE) {
      continue;
    }

    const placeAt = els.findIndex((c, j) => c === EMPTY_SPACE && j < i);
    if (placeAt === -1) {
      continue;
    }

    els[placeAt] = els[i];
    els[i] = EMPTY_SPACE;
  }

  return els.reduce((acc, char, index) => {
    if (char === EMPTY_SPACE) {
      return acc;
    }

    return acc + index * Number(char);
  }, 0);
}

export default main();
