import { readInput } from './util/readInput';

function getPosition(
  graph: string[][],
  char: string = '^'
): { i: number; j: number; n: number; m: number } {
  const n = graph.length!;
  const m = graph[0].length!;

  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      if (graph[i][j] === char) return { i, j, n, m };
    }
  }

  return { i: -1, j: -1, n, m };
}

const MOVE_MAP = {
  '^': { x: -1, y: 0 },
  '>': { x: 0, y: 1 },
  v: { x: 1, y: 0 },
  '<': { x: 0, y: -1 },
} as const;

const NEXT_DIR = {
  '^': '>',
  '>': 'v',
  v: '<',
  '<': '^',
} as const;

function move(args: {
  graph: string[][];
  i: number;
  j: number;
  n: number;
  m: number;
  char?: 'v' | '<' | '>' | '^';
}): { nextI: number; nextJ: number; nextChar: 'v' | '<' | '>' | '^' } {
  const { char = '^', graph, i, j, n, m } = args;
  const nextI = MOVE_MAP[char].x + i;
  const nextJ = MOVE_MAP[char].y + j;

  if (nextI < 0 || nextI >= n || nextJ < 0 || nextJ >= m)
    return { nextI, nextJ, nextChar: char };

  if (graph[nextI][nextJ] === '#' || graph[nextI][nextJ] === 'O') {
    const nextChar = NEXT_DIR[char];
    return move({ i, graph, j, char: nextChar, n, m });
  }

  return { nextI, nextJ, nextChar: char };
}

function hasLoop(graph: string[][]): boolean {
  let { i, j, n, m } = getPosition(graph);
  let char: 'v' | '<' | '>' | '^' = '^';

  const visited = new Set<string>();
  const map = Array.from({ length: n }).map(() =>
    Array.from({ length: m }).map(() => '.')
  );

  while (i >= 0 && i < n && j >= 0 && j < m) {
    const key = `${char}-${i}-${j}`;
    if (visited.has(key)) {
      return true;
    }

    if (map[i][j] === '.') map[i][j] = char;

    visited.add(key);

    const { nextI, nextJ, nextChar } = move({ graph, i, j, char, n, m });
    i = nextI;
    j = nextJ;
    char = nextChar;
  }

  return false;
}

async function solve() {
  const inputArr = await readInput('6.txt');
  const graph: string[][] = inputArr.split('\n').map((line) => line.split(''));
  let { n, m } = getPosition(graph);
  let ans = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (graph[i][j] === '.') {
        graph[i][j] = 'O';
        if (hasLoop(graph)) {
          ans++;
        }
        graph[i][j] = '.';
      }
    }
  }

  console.log(ans);
}

solve();
