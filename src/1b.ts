import { readInput } from './util/readInput';

async function solve() {
  const arr: number[] = [];
  const map: Map<number, number> = new Map();
  let ans = 0;

  const input = await readInput('1.txt');
  const lines = input.split('\n');
  lines.forEach((line) => {
    const numbers = line.split('   ');
    const n1 = +numbers[0];
    const n2 = +numbers[1];
    arr.push(n1);
    map.set(n2, (map.get(n2) ?? 0) + 1);
  });

  arr.forEach((n) => {
    const f = map.get(n) ?? 0;
    ans += n * f;
  });

  console.log(ans);
}

solve();
