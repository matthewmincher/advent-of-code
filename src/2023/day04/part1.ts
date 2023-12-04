import { parseInput } from "../../util";

type Card = {
  winningNumbers: number[];
  visibleNumbers: number[];
};

const input = parseInput<Card>({
  split: {
    mapper: (line: string) => {
      const card: Card = {
        winningNumbers: [],
        visibleNumbers: [],
      };

      line = line.substring(line.indexOf(":"));
      const dividerIndex = line.indexOf("|");
      const numbers = line.matchAll(/(\d+)/g);

      for (const number of numbers) {
        if (number.index! < dividerIndex) {
          card.winningNumbers.push(Number(number[0]));
        } else {
          card.visibleNumbers.push(Number(number[0]));
        }
      }

      return card;
    },
  },
});

function main() {
  return input
    .map((card) => {
      return card.visibleNumbers.filter((number) =>
        card.winningNumbers.includes(number)
      );
    })
    .filter((winningNumbers) => winningNumbers.length > 0)
    .reduce((sum, winningNumbers) => {
      return sum + 1 * Math.max(Math.pow(2, winningNumbers.length - 1), 1);
    }, 0);
}

export default main();
