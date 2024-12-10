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

  if (graph[nextI][nextJ] === '#') {
    const nextChar = NEXT_DIR[char];
    return move({ i, graph, j, char: nextChar, n, m });
  }

  return { nextI, nextJ, nextChar: char };
}

async function solve() {
  const inputArr = await readInput('6.txt');
  const graph: string[][] = inputArr.split('\n').map((line) => line.split(''));

  let { i, j, n, m } = getPosition(graph);
  let char: 'v' | '<' | '>' | '^' = '^';

  const visited = Array.from({ length: n }).map(() =>
    Array.from({ length: m }).map(() => false)
  );

  while (i >= 0 && i < n && j >= 0 && j < m) {
    // console.log('------------------------');

    visited[i][j] = true;

    // console.log('char', char);
    // console.log(
    //   visited.map((row) => row.map((x) => (x ? '1' : '.')).join('')).join('\n')
    // );

    const { nextI, nextJ, nextChar } = move({ graph, i, j, char, n, m });
    i = nextI;
    j = nextJ;
    char = nextChar;
  }

  const ans = visited.reduce((acc, row) => {
    return acc + row.reduce((rowAcc, value) => rowAcc + (value ? 1 : 0), 0);
  }, 0);

  console.log(ans);
}

solve();
