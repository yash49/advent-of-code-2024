import { readInput } from './util/readInput';

async function solve() {
  const arr1: number[] = [];
  const arr2: number[] = [];
  let ans = 0;

  const input = await readInput('1.txt');
  const lines = input.split('\n');
  lines.forEach((line) => {
    const [n1, n2] = line.split('   ');
    arr1.push(+n1);
    arr2.push(+n2);
  });

  arr1.sort((a, b) => a - b);
  arr2.sort((a, b) => a - b);

  for (let i = 0; i < arr1.length; i++) {
    ans += Math.abs(arr1[i] - arr2[i]);
  }

  console.log(ans);
}

solve();
