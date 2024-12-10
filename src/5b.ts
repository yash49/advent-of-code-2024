import { readInput } from './util/readInput';

function isValid(arr: string[], rules: string[][]) {
  let valid = true;

  rules.forEach(([a, b]) => {
    valid = valid && arr.indexOf(a) < arr.indexOf(b);
  });

  return valid;
}

function fix(arr: string[], rules: string[][]): number {
  const graph: Map<string, string[]> = new Map();

  arr.forEach((x) => {
    graph.set(x, []);
  });

  for (let i = 0; i < rules.length; i++) {
    // a -> b
    const [a, b] = rules[i];
    graph.get(a)!.push(b);
  }

  const incomingCountMap: Map<string, number> = new Map();

  arr.map((x) => {
    let count = 0;
    // count y -> x
    arr.forEach((y) => {
      if (x === y) return;
      count += graph.get(y)?.includes(x) ? 1 : 0;
    });
    incomingCountMap.set(x, count);
  });

  // now it becomes valid update
  arr.sort((first, second) => {
    return incomingCountMap.get(first)! - incomingCountMap.get(second)!;
  });

  const valid = isValid(arr, rules);

  if (valid) {
    return +arr[Math.floor(arr.length / 2)];
  }

  return 0;
}

async function solve() {
  let ans = 0;
  const inputArr = (await readInput('5.txt')).split('\n\n');

  const pairs: string[][] = inputArr[0]
    .split('\n')
    .map((x) => x.split('|') as [string, string]);
  const updates = inputArr[1].split('\n').map((x) => x.split(','));

  updates.forEach((update) => {
    const usedRules = pairs.filter(
      ([a, b]) => update.includes(a) && update.includes(b)
    );

    if (!isValid(update, usedRules)) ans += fix(update, usedRules);
  });

  console.log(ans);
}

solve();
