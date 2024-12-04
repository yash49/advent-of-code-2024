import { readInput } from './util/readInput';

async function solve() {
  let ans = 0;

  const input = await readInput('2.txt');
  const reports = input.split('\n');
  reports.forEach((report) => {
    const arr: number[] = report.split(' ').map((n) => +n);

    let isSafe1 = true;
    let isSafe2 = true;

    for (let i = 1; i < arr.length; i++) {
      const diff = arr[i] - arr[i - 1];
      isSafe1 = isSafe1 && diff >= 1 && diff <= 3;
      isSafe2 = isSafe2 && diff <= -1 && diff >= -3;
    }

    if (isSafe1 || isSafe2) ans++;
  });

  console.log(ans);
}

solve();
