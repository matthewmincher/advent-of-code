import { parseInput } from "../../util";

const input = parseInput({
  split: {
    mapper: false,
  },
});

type Race = {
  duration: number;
  recordDistance: number;
};

const times = input[0].match(/\d+/g);
const distances = input[1].match(/\d+/g);

const races: Race[] = times!.map((time, index) => {
  return {
    duration: Number(time),
    recordDistance: Number(distances![index]),
  };
});

function main() {
  return races
    .map((race) => {
      const winningHolds: number[] = [];

      for (let i = 0; i < race.duration; i++) {
        const distance = i * (race.duration - i);

        if (distance > race.recordDistance) {
          winningHolds.push(i);
        }
      }

      return winningHolds;
    })
    .reduce((sum, raceResults) => {
      return sum * raceResults.length;
    }, 1);
}

export default main();
