import { readInput } from './util/readInput';

async function solve() {
  let ans = 0;
  const input = await readInput('3.txt');

  const instructions =
    input.match(/(mul\(\d{1,3}\,\d{1,3}\))|(do\(\))|(don\'t\(\))/g) || [];

  let on = true;

  instructions.forEach((instruction) => {
    if (instruction === 'do()') {
      on = true;
      return;
    }

    if (instruction === "don't()") {
      on = false;
      return;
    }

    if (!on) return;

    const tmp = instruction.match(/(\d{1,3})\,(\d{1,3})/);

    if (tmp) ans += +tmp[1] * +tmp[2];
  });

  console.log(ans);
}

solve();
