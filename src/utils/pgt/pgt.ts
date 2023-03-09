import fs from 'fs-extra';
import { parse } from './internal';
import { PGT } from './pgt.types';

export async function readPgt(path: string) {
  const isFileExists = await fs.exists(path);
  if (!isFileExists) {
    throw new Error(`File doesn't exists: ${path}`);
  }

  const content = await fs.readFile(path, 'utf-8');

  let parsed = null;
  try {
    parsed = parse(content);
  } catch (e) {
    throw new Error(`Error while parsing file: ${path}`);
  }

  return parsed as PGT;
}
