import { parseInput } from '../../util';

const input = parseInput({
  split: false,
})
  .replace(/\n/g, '')
  .split(',');

const main = () => {
  return input
    .map((string) => {
      let val = 0;

      for (const char of string) {
        val += char.charCodeAt(0);
        val *= 17;
        val = val % 256;
      }

      return val;
    })
    .reduce((sum, val) => {
      return sum + val;
    }, 0);
};

export default main();
