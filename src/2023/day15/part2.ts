import { parseInput } from '../../util';

const input = parseInput({
  split: false,
})
  .replace(/\n/g, '')
  .split(',');

const getHashValue = (string: string) => {
  let val = 0;

  for (const char of string) {
    val += char.charCodeAt(0);
    val *= 17;
    val = val % 256;
  }

  return val;
};

type Lens = {
  label: string;
  focalLength: string;
};

const main = () => {
  const boxes: Lens[][] = Array(256)
    .fill(0)
    .map(() => []);

  for (const instruction of input) {
    const [_, label, operation, focalLength] = instruction.match(
      /([a-z]+)([-=])([0-9]+)?/,
    )!;
    const boxIndex = getHashValue(label);
    const box = boxes[boxIndex];

    if (operation === '-') {
      boxes[boxIndex] = box.filter((lens) => lens.label !== label);
    } else if (operation === '=') {
      const indexOfLensWithLabel = boxes[boxIndex].findIndex(
        (lens) => lens.label === label,
      );
      const lens = {
        label,
        focalLength,
      };

      if (indexOfLensWithLabel !== -1) {
        boxes[boxIndex][indexOfLensWithLabel] = lens;
      } else {
        boxes[boxIndex].push(lens);
      }
    }
  }

  return boxes.reduce((sum, box, boxIndex) => {
    return (
      sum +
      box.reduce((power, lens, lensIndex) => {
        return (
          power + (boxIndex + 1) * (lensIndex + 1) * Number(lens.focalLength)
        );
      }, 0)
    );
  }, 0);
};

export default main();
