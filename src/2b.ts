import console from 'console';
import { readInput } from './util/readInput';

function isSafe(arr: number[]) {
  let isSafe1 = true;
  let isSafe2 = true;

  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];
    isSafe1 = isSafe1 && diff >= 1 && diff <= 3;
    isSafe2 = isSafe2 && diff <= -1 && diff >= -3;
  }

  return isSafe1 || isSafe2;
}

function isSafeAfterRemovingOne(arr: number[]) {
  let ans = isSafe(arr);
  if (ans) return ans;

  for (let i = 0; i < arr.length; i++) {
    const tmp = [...arr.slice(0, i), ...arr.slice(i + 1)];
    ans = ans || isSafe(tmp);
  }

  return ans;
}

async function solve() {
  let ans = 0;

  const input = await readInput('2.txt');
  const reports = input.split('\n');

  reports.forEach((report) => {
    const arr: number[] = report.split(' ').map((n) => +n);
    if (isSafeAfterRemovingOne(arr)) ans++;
  });

  console.log(ans);
}

solve();
