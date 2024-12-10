import { readInput } from './util/readInput';

async function solve() {
  let ans = 0;
  const inputArr = (await readInput('5.txt')).split('\n\n');

  const pairs: string[][] = inputArr[0]
    .split('\n')
    .map((x) => x.split('|') as [string, string]);
  const updates = inputArr[1].split('\n');

  updates.forEach((update) => {
    let valid = true;

    const usedPairs = pairs.filter(
      ([a, b]) => update.includes(a) && update.includes(b)
    );
    usedPairs.forEach(([a, b]) => {
      valid = valid && update.indexOf(a) < update.indexOf(b);
    });

    if (valid) {
      const arr = update.split(',');
      ans += +arr[Math.floor(arr.length / 2)];
    }
  });

  console.log(ans);
}

solve();
