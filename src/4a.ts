import { readInput } from './util/readInput';

function count(lines: string[]) {
  let ans = 0;
  lines.forEach((line) => {
    ans += (line.match(/(XMAS)/g) || []).length;
    ans += (line.match(/(SAMX)/g) || []).length;
  });
  return ans;
}

async function solve() {
  let ans = 0;
  const input = await readInput('4.txt');

  const lines = input.split('\n') ?? [];
  ans += count(lines);

  // diag 1
  const d1: string[] = [];
  for (let i = lines[0].length - 1; i >= 0; i--) {
    let tmp = '';
    for (let j = 0, k = i; j < lines.length && k < lines[j].length; j++, k++) {
      tmp += lines[j].charAt(k);
    }
    if (tmp) d1.push(tmp);
  }
  for (let i = 1; i < lines.length; i++) {
    let tmp = '';
    for (let j = i, k = 0; j < lines.length && k < lines[j].length; j++, k++) {
      tmp += lines[j].charAt(k);
    }
    if (tmp) d1.push(tmp);
  }
  ans += count(d1);

  // diag 2
  const d2: string[] = [];
  for (let i = 0; i < lines[0].length; i++) {
    let tmp = '';
    for (let j = 0, k = i; j < lines.length && k >= 0; j++, k--) {
      tmp += lines[j].charAt(k);
    }
    if (tmp) d2.push(tmp);
  }
  for (let i = 1; i < lines.length; i++) {
    let tmp = '';
    for (
      let j = i, k = lines[0].length - 1;
      j < lines.length && k >= 0;
      j++, k--
    ) {
      tmp += lines[j].charAt(k);
    }
    if (tmp) d2.push(tmp);
  }
  ans += count(d2);

  // vertical
  const ver: string[] = [];
  for (let i = 0; i < lines[0].length; i++) {
    let tmp = '';
    for (let j = 0; j < lines.length; j++) {
      tmp += lines[j].charAt(i);
    }
    ver.push(tmp);
  }
  ans += count(ver);

  console.log(ans);
}

solve();
