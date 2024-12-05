import { parseInput } from "../../util";

const input = parseInput({
  split: false,
});

function main() {
  const [rulesString, pagesString] = input.split("\n\n");

  const rules = rulesString.split("\n").map((rule) => rule.split("|"));
  const pageList = pagesString.split("\n").map((pages) => pages.split(","));

  return pageList
    .filter((pages) => {
      for (const [first, second] of rules) {
        const filtered = pages.filter((page) => [first, second].includes(page));

        if (!filtered.includes(first) || !filtered.includes(second)) {
          continue;
        }

        if (!filtered.join().includes(`${first},${second}`)) {
          return true;
        }
      }

      return false;
    })
    .map((invalid) => {
      const working = [...invalid];

      working.sort((a, b) => {
        for (const rule of rules) {
          if (!rule.includes(a) || !rule.includes(b)) {
            continue;
          }

          return rule.indexOf(a) - rule.indexOf(b);
        }

        return 0;
      });

      return working;
    })
    .map((valid) => {
      return valid[Math.floor(valid.length / 2)];
    })
    .reduce((acc, val) => {
      return acc + Number(val);
    }, 0);
}

export default main();
