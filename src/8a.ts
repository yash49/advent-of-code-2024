import { readInput } from './util/readInput';

function generateAntinode(
  map: string[][],
  point1: { i: number; j: number },
  point2: { i: number; j: number },
  n: number,
  m: number
) {
  const x = point1.i - point2.i;
  const y = point1.j - point2.j;

  const antinode1 = {
    i: point1.i + x,
    j: point1.j + y,
  };

  const antinode2 = {
    i: point2.i - x,
    j: point2.j - y,
  };

  if (
    antinode1.i >= 0 &&
    antinode1.i < n &&
    antinode1.j >= 0 &&
    antinode1.j < m
  ) {
    map[antinode1.i][antinode1.j] = '#';
  }

  if (
    antinode2.i >= 0 &&
    antinode2.i < n &&
    antinode2.j >= 0 &&
    antinode2.j < m
  ) {
    map[antinode2.i][antinode2.j] = '#';
  }
}

async function solve() {
  const inputArr = await readInput('8.txt');
  const map: string[][] = inputArr.split('\n').map((line) => line.split(''));

  const n = map.length,
    m = map[0].length;
  const antennas: Map<string, { i: number; j: number }[]> = new Map();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (map[i][j] !== '.') {
        if (!antennas.get(map[i][j])) {
          antennas.set(map[i][j], []);
        }
        antennas.get(map[i][j])?.push({ i, j });
      }
    }
  }

  const antinodesMap = Array.from({ length: n }).map(() =>
    Array.from({ length: m }).map(() => '.')
  );

  for (const [antenna, cordinates] of antennas.entries()) {
    for (let i = 0; i < cordinates.length; i++) {
      for (let j = i + 1; j < cordinates.length; j++) {
        generateAntinode(antinodesMap, cordinates[i], cordinates[j], n, m);
      }
    }
  }

  const ans = antinodesMap
    .map((x) => x.join(''))
    .join('')
    .split('')
    .filter((x) => x === '#').length;

  console.log(ans);
}

solve();
