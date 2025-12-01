import { getChallengePartStructure, getPathsForChallenge } from "./util";

const partStructure = getChallengePartStructure();

const outputSolution = () => {
  const path = getPathsForChallenge(partStructure);
  console.log(
    `Year: ${partStructure.year} | Day ${partStructure.day} | Part ${
      partStructure.part
    } - Solution: ${require(`./${path.directory}${path.solution}.js`).default}`,
  );
};

const validate = (type: "year" | "day" | "part", num: number, max: number) => {
  if (num < 1 || num > max + 1)
    throw new Error(
      `The ${type} must be number between 1 and ${max}, you entered ${num}`,
    );
};

validate("year", partStructure.year, 2025);
validate("day", partStructure.day, 25);
validate("part", partStructure.part, 2);
outputSolution();
