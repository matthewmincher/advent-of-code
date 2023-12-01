import { mkdirSync, readFileSync, writeFileSync } from "fs";

type ChallengePartStructure = {
  year: number;
  day: number;
  part: number;
};

export function getChallengePartStructure(): ChallengePartStructure {
  const path = process.env
    .npm_config_part!.split(".")
    .map((number) => Number(number));

  if (path.length !== 3) {
    throw new Error(`The part must be of the format Year.Day.Part`);
  }

  return {
    year: path[0],
    day: path[1],
    part: path[2],
  };
}

export function getPathsForChallenge({
  year,
  day,
  part,
}: ChallengePartStructure): { directory: string; solution: string } {
  return {
    directory: `${year}/day${formatDay(day)}/`,
    solution: `part${part}`,
  };
}

export const formatDay = (day: number | string) =>
  day.toString().padStart(2, "0");

/**
 * @typedef {Object} SplitOptions
 * @property {string|false} [delimiter='\n'] - a delimeter to split the input by (false will omit the splitting and return the entire input)
 * @property {funcion(string, number, string[]): *|false} [mapper=Number] - a function that will be used to map the splitted input (false will omit the mapping and return the splitted input)
 */
interface SplitOptions<T> {
  delimiter?: string;
  mapper?: ((e: string, i: number, a: string[]) => T) | false;
}

export function parseInput(): number[];
export function parseInput(options: { split: false }): string;
export function parseInput(options: {
  split: { delimiter?: string; mapper: false };
}): string[];
export function parseInput(options: { split: { delimiter: string } }): number[];
export function parseInput<T>(options: { split: SplitOptions<T> }): T[];
/**
 * Parse the input from {day}/input.txt
 * @param {SplitOptions} [split]
 */
export function parseInput<T>({
  split,
}: { split?: SplitOptions<T> | false } = {}) {
  const structure = getChallengePartStructure();
  const path = getPathsForChallenge(structure);

  const input = readFileSync(`./src/${path.directory}input.txt`, {
    encoding: "utf-8",
  });

  if (split === false) return input;

  const splitted = input.split(split?.delimiter ?? "\n");
  const mapper = split?.mapper;

  return mapper === false
    ? splitted
    : splitted.map((...args) => mapper?.(...args) ?? Number(args[0]));
}

const genTemplate = (part: 1 | 2) => `import { parseInput } from '../../util';

const input = parseInput();

// TODO: Complete Part ${part}
`;

export const setupDay = (year: number, day: number) => {
  const dir = `./src/${year}/day${formatDay(day)}`;
  mkdirSync(dir);
  writeFileSync(`${dir}/input.txt`, "");
  writeFileSync(`${dir}/part1.ts`, genTemplate(1));
  writeFileSync(`${dir}/part2.ts`, genTemplate(2));
};
