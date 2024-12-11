import { readInput } from './util/readInput';

function possible(
  eq: number[],
  ansSoFar: number,
  goal: number,
  index: number
): boolean {
  if (index === eq.length) {
    return ansSoFar === goal;
  }

  return (
    possible(eq, ansSoFar + eq[index], goal, index + 1) ||
    possible(eq, ansSoFar * eq[index], goal, index + 1)
  );
}

async function solve() {
  const input = await readInput('7.txt');
  const lines = input.split('\n');

  const testValues: number[] = [];
  const eqs: number[][] = [];

  lines.map((line) => {
    const [a, e] = line.split(':');
    testValues.push(+a);
    eqs.push(
      e
        .trim()
        .split(' ')
        .map((x) => +x)
    );
  });

  let ans = 0;

  for (let i = 0; i < eqs.length; i++) {
    if (possible(eqs[i], eqs[i][0], testValues[i], 1)) {
      ans += testValues[i];
    }
  }

  console.log(ans);
}

solve();
