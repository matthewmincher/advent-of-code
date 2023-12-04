import { parseInput } from "../../util";

class Card {
  winningNumbers: number[];
  visibleNumbers: number[];

  additionalCards: Card[] = [];
  count = 1;

  constructor(winningNumbers: number[], visibleNumbers: number[]) {
    this.winningNumbers = winningNumbers;
    this.visibleNumbers = visibleNumbers;
  }

  matchedNumbers(): number[] {
    return this.visibleNumbers.filter((number) =>
      this.winningNumbers.includes(number)
    );
  }

  copy(): Card {
    return new Card(this.winningNumbers, this.visibleNumbers);
  }
}

const originalCards = parseInput<Card>({
  split: {
    mapper: (line) => {
      const winningNumbers = [];
      const visibleNumbers = [];

      line = line.substring(line.indexOf(":"));
      const dividerIndex = line.indexOf("|");
      const numbers = line.matchAll(/(\d+)/g);

      for (const number of numbers) {
        if (number.index! < dividerIndex) {
          winningNumbers.push(Number(number[0]));
        } else {
          visibleNumbers.push(Number(number[0]));
        }
      }

      return new Card(winningNumbers, visibleNumbers);
    },
  },
});

function main() {
  const cardQuantities = originalCards.map(() => 1);

  originalCards.forEach((card, index) => {
    const matchedNumbers = card.matchedNumbers();

    for (let i = 1; i <= matchedNumbers.length; i++) {
      cardQuantities[index + i] += cardQuantities[index] ?? 1;
    }
  });

  return cardQuantities.reduce((sum, quantity) => sum + quantity, 0);
}

export default main();
