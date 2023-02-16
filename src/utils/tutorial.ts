import * as fs from "fs-extra";
import path from "path";

const DATA_PATH = "data";
const TUTORIALS_PATH = "tutorials";

export async function getAllTutorials() {
  const basePath = path.resolve(process.cwd(), DATA_PATH, TUTORIALS_PATH);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Tutorials folder doesn't exists: ${basePath}`);
  }

  return await fs.readdir(basePath);
}

export async function readFullTutorial(slug: string) {
  const basePath = path.resolve(process.cwd(), DATA_PATH, TUTORIALS_PATH, slug);
  if (!(await fs.pathExists(basePath))) {
    throw new Error(`Tutorial folder doesn't exists: ${basePath}`);
  }

  const metaPath = path.resolve(basePath, "meta.json");
  if (!(await fs.pathExists(metaPath))) {
    throw new Error(`Meta file doesn't exists: ${metaPath}`);
  }

  const indexPath = path.resolve(basePath, "index.json");
  if (!(await fs.pathExists(indexPath))) {
    throw new Error(`Index file doesn't exists: ${indexPath}`);
  }

  const metaContents = (await fs.readJSON(metaPath)) as IChessTutorialMeta;
  const indexContents = (await fs.readJSON(indexPath)) as IChessTutorialIndex;

  return {
    ...metaContents,
    ...indexContents,
  } as IChessTutorial;
}
