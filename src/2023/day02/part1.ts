import { parseInput } from "../../util";

type CubeColour = "red" | "green" | "blue";
type CubeExposure = {
  colour: CubeColour;
  count: number;
};
type GameRound = {
  cubes: CubeExposure[];
};
type GameRules = {
  cubeCounts: Record<CubeColour, number>;
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

const gameRules: GameRules = {
  cubeCounts: {
    red: 12,
    green: 13,
    blue: 14,
  },
};

function gameIsPossible(game: Game): boolean {
  return game.rounds.filter(roundIsPossible).length === game.rounds.length;
}
function roundIsPossible(round: GameRound): boolean {
  return (
    round.cubes.filter(
      (exposure) => exposure.count <= gameRules.cubeCounts[exposure.colour]
    ).length === round.cubes.length
  );
}

function main() {
  return input.filter(gameIsPossible).reduce((sum, game) => {
    return sum + game.id;
  }, 0);
}

export default main();
