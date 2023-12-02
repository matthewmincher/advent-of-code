import { parseInput } from "../../util";

const cubeColours = ["red", "green", "blue"] as const;
type CubeColour = (typeof cubeColours)[number];

type CubeExposure = {
  colour: CubeColour;
  count: number;
};
type GameRound = {
  cubes: CubeExposure[];
};
type Game = {
  id: number;
  rounds: GameRound[];
};

const input = parseInput<Game>({
  split: {
    mapper: function (line) {
      const gameId = line.match(/Game (\d+):/)?.[1];
      const roundStrings = line.matchAll(
        /([:|;] (?<a>\d+ [a-z]+)(, (?<b>\d+ [a-z]+))?(, (?<c>\d+ [a-z]+))?)/g
      );

      let rounds = [];

      for (const roundString of roundStrings) {
        let cubes: CubeExposure[] = [];

        ["a", "b", "c"].forEach((groupName) => {
          if (roundString.groups![groupName]) {
            const split = roundString.groups![groupName].split(" ");

            cubes.push({
              colour: split[1] as CubeColour,
              count: Number(split[0]),
            });
          }
        });

        rounds.push({
          cubes: cubes,
        });
      }

      return {
        id: Number(gameId),
        rounds: rounds,
      };
    },
  },
});

type MinimumSet = Record<CubeColour, number>;
const emptyMimimumSet: MinimumSet = {
  red: 0,
  green: 0,
  blue: 0,
};

function findMinimumSetInGame(game: Game): MinimumSet {
  return game.rounds.reduce((highCount: MinimumSet, round) => {
    const roundMinimumSet = findMinimumSetInRound(round);

    return {
      red: Math.max(highCount.red, roundMinimumSet.red),
      blue: Math.max(highCount.blue, roundMinimumSet.blue),
      green: Math.max(highCount.green, roundMinimumSet.green),
    };
  }, emptyMimimumSet);
}
function findMinimumSetInRound(round: GameRound): MinimumSet {
  return round.cubes.reduce((highCount: MinimumSet, exposure) => {
    return {
      ...highCount,
      [exposure.colour]: Math.max(highCount[exposure.colour], exposure.count),
    };
  }, emptyMimimumSet);
}

function main() {
  return input.map(findMinimumSetInGame).reduce((power, minimumSet) => {
    return power + minimumSet.red * minimumSet.green * minimumSet.blue;
  }, 0);
}

export default main();
