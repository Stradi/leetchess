import { ITag, ITutorial, ILearningPath } from '@/types';
import * as fs from 'fs-extra';
import path from 'path';
import { readPgt } from './pgt/pgt';
import { PGT } from './pgt/pgt.types';

const DATA_PATH = 'data';
const TUTORIALS_PATH = 'tutorials';
const TAGS_PATH = 'tags';
const LEARNING_PATHS_FILE = 'learning-paths.json';

export async function getAllTutorials() {
  const basePath = path.resolve(process.cwd(), DATA_PATH, TUTORIALS_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Tutorials folder doesn't exists: ${basePath}`);
  }

  return (await fs.readdir(basePath)).map((file) => path.basename(file, '.pgt'));
}

export async function getTutorial(slug: string) {
  const basePath = path.resolve(process.cwd(), DATA_PATH, TUTORIALS_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Tutorials folder doesn't exists: ${basePath}`);
  }

  const pgtPath = path.resolve(basePath, `${slug}.pgt`);
  if (!(await fs.pathExists(pgtPath))) {
    throw new Error(`Pgt file doesn't exists: ${pgtPath}`);
  }

  const pgt = await readPgt(pgtPath);
  const tagSlugs = pgt.headers.find((header) => header.key.toLowerCase() === 'tags')?.value.split(',') || [];
  const slugifiedTags = tagSlugs.map((tagSlug) => tagSlug.trim().toLowerCase().replace(/ /g, '-'));
  const tags = await Promise.all(slugifiedTags.map((tagSlug) => getTag(tagSlug.trim())));

  return {
    pgt,
    slug,
    name: pgt.headers.find((header) => header.key.toLowerCase() === 'name')?.value,
    subtitle: pgt.headers.find((header) => header.key.toLowerCase() === 'subtitle')?.value,
    description: pgt.headers.find((header) => header.key.toLowerCase() === 'description')?.value,
    tags,
    next: pgt.headers.find((header) => header.key.toLowerCase() === 'next')?.value || null,
  } as ITutorial;
}

export async function getAllLearningPaths() {
  const basePath = path.resolve(process.cwd(), DATA_PATH, LEARNING_PATHS_FILE);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Learning paths file doesn't exists: ${basePath}`);
  }

  const contents = await fs.readJSON(basePath);
  return contents.items as ILearningPath[];
}

export async function getLearningPath(slug: string, populate = false) {
  const contents = await getAllLearningPaths();
  const learningPath = contents.find((item) => item.slug === slug) as ILearningPath;

  if (!learningPath) {
    throw new Error(`Learning path doesn't exists: ${slug}`);
  }

  if (populate) {
    const tutorials = await Promise.all((learningPath.lessons as string[]).map((tutorial) => getTutorial(tutorial)));
    return {
      ...learningPath,
      lessons: tutorials.map((tutorial) => ({
        ...tutorial,
        pgt: {} as PGT,
      })),
    } as ILearningPath;
  }

  return learningPath;
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
