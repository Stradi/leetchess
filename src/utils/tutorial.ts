import * as fs from "fs-extra";
import path from "path";

const DATA_PATH = "data";
const TUTORIALS_PATH = "tutorials";
const TAGS_PATH = "tags";
const LEARNING_PATHS_PATH = "learning-paths";

export async function getAllTutorials() {
  const basePath = path.resolve(process.cwd(), DATA_PATH, TUTORIALS_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Tutorials folder doesn't exists: ${basePath}`);
  }

  return await fs.readdir(basePath);
}

export async function getTutorialMeta(slug: string) {
  const basePath = path.resolve(process.cwd(), DATA_PATH, TUTORIALS_PATH, slug);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Tutorial folder doesn't exists: ${basePath}`);
  }

  const metaPath = path.resolve(basePath, "meta.json");
  if (!(await fs.pathExists(metaPath))) {
    throw new Error(`Meta file doesn't exists: ${metaPath}`);
  }

  const meta = (await fs.readJSON(metaPath)) as IChessTutorialMeta;

  // At this point, tags are just string. So we can safely map them to the actual tag object.
  meta.tags = await Promise.all(meta.tags.map((tag) => getTag(tag as string)));
  return meta;
}

export async function getTutorialIndex(slug: string) {
  const basePath = path.resolve(process.cwd(), DATA_PATH, TUTORIALS_PATH, slug);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Tutorial folder doesn't exists: ${basePath}`);
  }

  const indexPath = path.resolve(basePath, "index.json");
  if (!(await fs.pathExists(indexPath))) {
    throw new Error(`Index file doesn't exists: ${indexPath}`);
  }

  return (await fs.readJSON(indexPath)) as IChessTutorialIndex;
}

export async function readFullTutorial(slug: string) {
  const meta = await getTutorialMeta(slug);
  const index = await getTutorialIndex(slug);

  return {
    ...meta,
    ...index,
  } as IChessTutorial;
}

export async function getAllLearningPaths() {
  const basePath = path.resolve(process.cwd(), DATA_PATH, LEARNING_PATHS_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Learning paths folder doesn't exists: ${basePath}`);
  }

  return await fs.readdir(basePath);
}

export async function getLearningPath(slug: string) {
  const basePath = path.resolve(process.cwd(), DATA_PATH, LEARNING_PATHS_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Learning paths folder doesn't exists: ${basePath}`);
  }

  const learningPathPath = path.resolve(basePath, slug);
  if (!(await fs.pathExists(learningPathPath))) {
    throw new Error(`Learning path file doesn't exists: ${learningPathPath}`);
  }

  const learningPath = (await fs.readJSON(learningPathPath)) as ILearningPath;
  const tags = await Promise.all(
    learningPath.tags.map((tag) => getTag(tag as string))
  );

  const tutorials = await Promise.all(
    learningPath.tutorials.map((tutorial) =>
      readFullTutorial(tutorial as string)
    )
  );

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
