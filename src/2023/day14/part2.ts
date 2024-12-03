import { parseInput } from "../../util";

const input = parseInput({
  split: false,
})
  .split("\n")
  .map((line) => line.split(""));

function slideBouldersUp(board: string[][]) {
  const columns = board[0].length;

  for (let x = 0; x < columns; x++) {
    let stackYPos = 0;

    for (let y = 0; y < board.length; y++) {
      const char = board[y][x];

      if (char === "#") {
        stackYPos = y + 1;

        continue;
      }

      if (char === "O") {
        if (stackYPos !== y) {
          board[stackYPos][x] = char;
          board[y][x] = ".";
        }

        stackYPos++;
      }
    }
  }
}

const rotate = (board: string[][]): string[][] => {
  return board[0].map((v, k) => board.map((row) => row[k]).reverse());
};

const cycle = (board: string[][]): string[][] => {
  for (const i of ["N", "W", "S", "E"]) {
    // console.group(i);
    // console.log("Pre");
    // for (const row of board) {
    //   console.log(JSON.stringify(row));
    // }
    slideBouldersUp(board);
    // console.log("Post");
    // for (const row of board) {
    //   console.log(JSON.stringify(row));
    // }
    board = rotate(board);
    // console.groupEnd();
  }

  // console.log("After cycle:");
  //
  // for (const row of board) {
  //   console.log(JSON.stringify(row));
  // }

  return board;
};

function main() {
  let board = input;
  let layoutsSeen = new Map<string, number>();

  const target = 1000000000;
  for (let i = 1; i <= target; i++) {
    console.log(i);
    board = cycle(board);

    const boardState = JSON.stringify(board);

    if (layoutsSeen.has(boardState)) {
      console.log(`${target}, ${i}, ${layoutsSeen.get(boardState)}`);
      if ((target - i) % (i - layoutsSeen.get(boardState)!) == 0) {
        break;
      }
    }

    layoutsSeen.set(boardState, i);
  }

  const rowCount = input.length;
  return board
    .map((row, rowIndex) => {
      return (
        row
          .map((char) => (char === "O" ? 1 : 0))
          .reduce((previous, current) => previous + current, 0 as number) *
        (rowCount - rowIndex)
      );
    })
    .reduce((previous, current) => {
      return previous + current;
    }, 0);
}

export default main();
