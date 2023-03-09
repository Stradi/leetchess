import { ILearningPath, ITag, ITutorial } from '@/types';
import * as fs from 'fs-extra';
import path from 'path';
import { readPgt } from './pgt/pgt';

const DATA_PATH = 'data';
const TUTORIALS_PATH = 'tutorials';
const TAGS_PATH = 'tags';
const LEARNING_PATHS_PATH = 'learning-paths';

export async function getAllTutorials() {
  const basePath = path.resolve(process.cwd(), DATA_PATH, TUTORIALS_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Tutorials folder doesn't exists: ${basePath}`);
  }

  return await fs.readdir(basePath);
}

export async function getTutorial(slug: string) {
  const basePath = path.resolve(process.cwd(), DATA_PATH, TUTORIALS_PATH, slug);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Tutorial folder doesn't exists: ${basePath}`);
  }

  const pgtPath = path.resolve(basePath, 'index.pgn');
  if (!(await fs.pathExists(pgtPath))) {
    throw new Error(`Pgt file doesn't exists: ${pgtPath}`);
  }

  const pgt = await readPgt(pgtPath);

  return {
    pgt,
    slug,
    name: pgt.headers.find((header) => header.key.toLowerCase() === 'name')?.value,
    subtitle: pgt.headers.find((header) => header.key.toLowerCase() === 'subtitle')?.value,
    description: pgt.headers.find((header) => header.key.toLowerCase() === 'description')?.value,
    tags:
      pgt.headers
        .find((header) => header.key.toLowerCase() === 'tags')
        ?.value.split(',')
        .map((tag) => tag.trim()) || [],
  } as ITutorial;
}

export async function getAllLearningPaths() {
  const basePath = path.resolve(process.cwd(), DATA_PATH, LEARNING_PATHS_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Learning paths folder doesn't exists: ${basePath}`);
  }

  return (await fs.readdir(basePath)).map((file) => file.replace('.json', ''));
}

export async function getLearningPath(slug: string) {
  const basePath = path.resolve(process.cwd(), DATA_PATH, LEARNING_PATHS_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Learning paths folder doesn't exists: ${basePath}`);
  }

  const learningPathPath = path.resolve(basePath, `${slug}.json`);
  if (!(await fs.pathExists(learningPathPath))) {
    throw new Error(`Learning path file doesn't exists: ${learningPathPath}`);
  }

  const learningPath = (await fs.readJSON(learningPathPath)) as ILearningPath;
  const tags = await Promise.all(learningPath.tags.map((tag) => getTag(tag as string)));

  const tutorials = await Promise.all(learningPath.tutorials.map((tutorial) => getTutorial(tutorial as string)));

  return {
    ...learningPath,
    tags,
    tutorials,
  } as ILearningPath;
}

async function getTag(slug: string) {
  const basePath = path.resolve(process.cwd(), DATA_PATH, TAGS_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Tags folder doesn't exists: ${basePath}`);
  }

  const tagPath = path.resolve(basePath, `${slug}.json`);
  if (!(await fs.exists(tagPath))) {
    throw new Error(`Tag file doesn't exists: ${tagPath}`);
  }

  return (await fs.readJSON(tagPath)) as ITag;
}
