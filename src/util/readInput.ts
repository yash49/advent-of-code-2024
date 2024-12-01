import fs from 'node:fs/promises';
import path from 'node:path';

export const readInput = async (fileName: string) => {
  const data = await fs.readFile(
    path.join(__dirname, '..', 'input', fileName),
    { encoding: 'utf8' }
  );
  return data;
};
