import { readInput } from './util/readInput';

function check(
  arr: string[][],
  i: number,
  j: number,
  n: number,
  m: number
): boolean {
  if (arr[i][j] !== 'A') return false;

  if (i - 1 < 0) return false;
  if (i + 1 >= n) return false;
  if (j - 1 < 0) return false;
  if (j + 1 >= m) return false;

  const tmp1 = [arr[i - 1][j - 1], arr[i + 1][j + 1]].sort().join('');
  const tmp2 = [arr[i - 1][j + 1], arr[i + 1][j - 1]].sort().join('');

  return tmp1 === 'MS' && tmp2 == 'MS';
}

async function solve() {
  let ans = 0;
  const input = await readInput('4.txt');

  const lines = input.split('\n') ?? [];
  const arr: string[][] = [];

  lines.forEach((line) => arr.push(line.split('')));

  const n = arr.length;
  const m = arr[0].length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      ans += check(arr, i, j, n, m) ? 1 : 0;
    }
  }

  console.log(ans);
}

solve();
