import { parseInput } from "../../util";

const distinctScoreConfiguration: Record<number, number> = {
  1: 1,
  2: 5,
  3: 20,
  4: 50,
  5: 100,
};

const cardValue = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "T",
  "J",
  "Q",
  "K",
  "A",
];

class Hand {
  cards: string[];
  bid: number;

  sets: Record<string, number> = {};

  constructor(cards: string[], bid: number) {
    this.cards = cards;
    this.bid = bid;

    this.cards.forEach((card) => {
      this.sets[card] = (this.sets[card] ?? 0) + 1;
    });
  }

  distinctCardCount(): number {
    return Object.keys(this.sets).length;
  }

  distinctCardScore(): number {
    let score = 0;

    for (const [key, value] of Object.entries(this.sets)) {
      score += distinctScoreConfiguration[value];
    }

    return score;
  }

  compareTo(hand: Hand): number {
    const aDistinctCount = this.distinctCardCount(),
      bDistinctCount = hand.distinctCardCount();

    if (aDistinctCount === bDistinctCount) {
      const aDisctinctScore = this.distinctCardScore(),
        bDistinctScore = hand.distinctCardScore();

      if (aDisctinctScore === bDistinctScore) {
        for (let i = 0; i < 5; i++) {
          const aCard = this.cards[i],
            bCard = hand.cards[i];

          const aCardScore = cardValue.indexOf(aCard);
          const bCardScore = cardValue.indexOf(bCard);

          if (aCardScore != bCardScore) {
            return bCardScore - aCardScore;
          }
        }
      }

      return bDistinctScore - aDisctinctScore;
    }

    return aDistinctCount - bDistinctCount;
  }
}

const input = parseInput<Hand>({
  split: {
    mapper: (line): Hand => {
      const [cards, bid] = line.split(" ");

      return new Hand(cards.split(""), Number(bid));
    },
  },
});

function main() {
  return input
    .sort((a, b) => a.compareTo(b))
    .reverse()
    .reduce((sum, hand, index) => {
      return sum + hand.bid * (index + 1);
    }, 0);
}

export default main();
