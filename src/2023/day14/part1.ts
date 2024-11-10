import { parseInput } from '../../util';

const input = parseInput({
  split: false,
})
  .split('\n')
  .map((line) => line.split(''));

function slideBouldersUp(board: string[][]) {
  const columns = board[0].length;

  for (let x = 0; x < columns; x++) {
    let stackYPos = 0;

    for (let y = 0; y < board.length; y++) {
      const char = board[y][x];

      if (char === '#') {
        stackYPos = y + 1;

        continue;
      }

      if (char === 'O') {
        if (stackYPos !== y) {
          board[stackYPos][x] = char;
          board[y][x] = '.';
        }

        stackYPos++;
      }
    }
  }
}

function main() {
  slideBouldersUp(input);
  const rowCount = input.length;
  return input
    .map((row, rowIndex) => {
      return (
        row
          .map((char) => (char === 'O' ? 1 : 0))
          .reduce((previous, current) => previous + current, 0 as number) *
        (rowCount - rowIndex)
      );
    })
    .reduce((previous, current) => {
      return previous + current;
    }, 0);
}

export default main();
